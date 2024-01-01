import express from "express";
const router = express.Router();
import { getAccountsOpened }from "../controllers/accountsOpened.js";


router.get("/", getAccountsOpened);

export default router;
