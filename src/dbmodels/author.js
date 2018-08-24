module.exports = function(sequelize, Sequelize) {
	var Author = sequelize.define('author', {
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

    return Author ;
}