import mysql from 'mysql2/promise'
import { configDotenv } from 'dotenv'

configDotenv()

async function init_db() {
    try{
        const db = await mysql.createConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST
    })
    await db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`)
    await db.end()
    console.log("Database initialized.");
    

   }catch(e){
        console.log(e)
    }
    
}

export default init_db