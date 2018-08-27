import Sequelize from 'sequelize';
import DBConnection from './connection';
import Blog from './blog' ;

const author = DBConnection.define('author', {
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



export default author ;