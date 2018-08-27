import Sequelize from 'sequelize';

const dbConnection =  new Sequelize(
	'testgraphql',
	'testgraphql',
	'testgraphql',
	{
		dialect: 'postgres',
		host: 'localhost'
	}
);

export default dbConnection ;
