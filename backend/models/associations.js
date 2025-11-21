import Blogs from "./blogs.js";
import Users from "./users.js";

Blogs.belongsTo(Users,{foreignKey:'author'});
Users.hasMany(Blogs, { foreignKey: 'author' }); 



export{Blogs,Users}