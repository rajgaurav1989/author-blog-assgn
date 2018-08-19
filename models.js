import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  'testgraphql',
  'testgraphql',
  'testgraphql',
  {
    dialect: 'postgres',
    host: 'localhost'
  }
);


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

