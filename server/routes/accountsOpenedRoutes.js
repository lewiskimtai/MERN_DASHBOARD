import express from "express";
const router = express.Router();
import { getAccountsOpened } from "../controllers/accountsOpened.js";
/** 
import { uploadAccountsData } from "../controllers/accountsOpened.js";
*/

router.get("/", getAccountsOpened);

/** 
router.post("/upload", uploadAccountsData);
*/


export default router;

