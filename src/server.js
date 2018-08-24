import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './schema/schema';
import models from './dbmodels/models'

const APP_PORT = 3000;

const app = Express();

models.sequelize.sync()
    .then(function() {
        app.listen(APP_PORT, ()=> {
          console.log(`App listening on port ${APP_PORT}`);
        });
    })
    .catch(function (e) {
        throw new Error(e);
    });

app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

