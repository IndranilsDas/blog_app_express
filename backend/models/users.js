import sequelize from "../db/connection.js";
import { DataTypes, Model } from "sequelize";


class Users extends Model{}

Users.init(

    {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false

    },
    profile_picture:{
        type:DataTypes.STRING
    }

},{
    sequelize,
    modelName: "Users",
    tableName: "Users",
    timestamps: true,   
  }

)

export default Users