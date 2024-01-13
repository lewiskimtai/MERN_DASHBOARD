import { format } from "date-fns";

import { v4 as uuid } from "uuid";
import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    const currentDir = process.cwd();
    const logsDir = path.join(currentDir, "logs");

    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir, { recursive: true });
    }
    await fsPromises.appendFile(path.join(logsDir, logFileName), logItem);
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
};

export { logEvents, logger };
