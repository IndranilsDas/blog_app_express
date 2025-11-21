import {Sequelize} from 'sequelize'
import { configDotenv } from 'dotenv'
import init_db from './db.js'

configDotenv()


    
await init_db()
    
const sequelize =  new Sequelize(process.env.DB_NAME,
     process.env.DB_USER,
     process.env.DB_PASS,
     {dialect:'mysql',host:process.env.DB_HOST,logging:false})

export async function dbConnection_init (sequelize) {
    await sequelize.authenticate()
    await sequelize.sync({alter:true})
    console.log("connection successful.")
}

export default sequelize