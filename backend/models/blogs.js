import { DataTypes,Model } from "sequelize";
import sequelize from "../db/connection.js";

class Blogs extends Model{}

Blogs.init({
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    title:{type:DataTypes.STRING,allowNull:false},
    tagline:{type:DataTypes.STRING},
    image:{type:DataTypes.STRING},
    body:{type:DataTypes.TEXT,allowNull:false},
    tags:{type:DataTypes.JSON,defaultValue:[]}

},{sequelize,
    tableName:'blogs',
    modelName:'Blogs',
    timestamps:true

}
)

export default Blogs
