import DBConnection from './connection' ;
import Author from './author' ;
import Blog from './blog' ;

let db = {};

db.connection = DBConnection ;
db.Author = Author ;
db.Blog = Blog ;

db.Author.hasMany(db.Blog, { foreignKey: "author_id", sourceKey: "id", onDelete: 'cascade', hooks: true });
db.Blog.belongsTo(db.Author, { foreignKey: "author_id", targetKey: "id" });

export default db ;