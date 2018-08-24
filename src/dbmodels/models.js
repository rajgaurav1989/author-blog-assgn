'use strict';

var Sequelize = require('sequelize');
var db        = {};

var sequelize = new Sequelize(
  'testgraphql',
  'testgraphql',
  'testgraphql',
  {
    dialect: 'postgres',
    host: 'localhost'
  }
);

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

db.Author = require('./author.js')(sequelize, Sequelize);  
db.Blog = require('./blog.js')(sequelize, Sequelize);  

db.Author.hasMany(db.Blog, { foreignKey: "author_id", sourceKey: "id", onDelete: 'cascade', hooks: true });
db.Blog.belongsTo(db.Author, { foreignKey: "author_id", targetKey: "id" });

module.exports = db;

