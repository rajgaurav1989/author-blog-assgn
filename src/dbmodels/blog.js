import Sequelize from 'sequelize';
import DBConnection from './connection';
import Author from './author'

const blog = DBConnection.define('blog', {
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

export default blog ;