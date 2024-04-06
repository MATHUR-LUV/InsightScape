import mysql from "mysql";
import dotenv from 'dotenv'
dotenv.config();
export const db = mysql.createConnection({
    host:"sql6.freemysqlhosting.net",
    user:"sql6696912",
    password: process.env.PASSWORD,
    database:"sql6696912"
})
