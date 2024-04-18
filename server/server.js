import morgan from "morgan";
import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { logger, logEvents } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import connectDB from "./config/dbConn.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import rootRoutes from "./routes/root.js";
import accountsOpenedRoutes from "./routes/accountsOpenedRoutes.js";

/** 
import { exec } from "child_process";
*/

// data imports
import Accountsopened from "./models/accountsOpened.js";
import { dataAccountsOpened } from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
import helmet from "helmet";
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors(corsOptions));
app.use(logger);
app.use(cookieParser());

/* ROUTES */
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", rootRoutes);
app.use("/accountsopened", accountsOpenedRoutes);

/**
// Define route handler for POST /upload


app.post('/upload', async (req, res) => {
  try {
    // Assume req.body contains the JSON data to import
    const jsonData = req.body;

    // Convert the JSON data to a string
    const jsonString = JSON.stringify(jsonData);

    // Use mongoimport to import the JSON data
    const command = `echo '${jsonString}' | mongoimport --uri=${process.env.DATABASE_URI} --collection=${process.env.COLLECTION_NAME} --jsonArray`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'Failed to import data' });
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        res.status(500).json({ message: 'Failed to import data' });
        return;
      }
      console.log(`stdout: ${stdout}`);
      res.status(201).json({ message: 'Data imported successfully' });
    });
  } catch (error) {
    console.error('Error importing data:', error);
    res.status(500).json({ message: 'Failed to import data' });
  }
});
*/

/* MONGOOSE SETUP */
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.set("strictQuery", true);
const PORT = process.env.PORT || 3500;
console.log(process.env.NODE_ENV);
connectDB();
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  /* ONLY ADD DATA ONE TIME */
  //Accountsopened.insertMany(dataAccountsOpened);
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
