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

/*
const Author = sequelize.define('author', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id'
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });



const Blog = sequelize.define('blog', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id'
        },
        author_id: {
            type: Sequelize.INTEGER,
            allowNull:false
        },
        blog_content: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });

Author.hasMany(Blog ,{ foreignKey: "author_id", sourceKey: "id" , onDelete: 'cascade', hooks: true});
Blog.belongsTo(Author, { foreignKey: "author_id", targetKey: "id" });

sequelize.sync();

module.exports = {
    sequelize : sequelize,
    Author : Author,
    Blog : Blog
}

*/
