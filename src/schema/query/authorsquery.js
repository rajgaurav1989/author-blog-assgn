import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLInt,
    GraphQLInputObjectType
} from 'graphql';

import models from '../../dbmodels/modelHelper';
import Blog from '../blogtype' ;
import Author from '../authortype';

let authorsQuery = {
    type: new GraphQLList(Author),
    resolve(root, args) {
        return models.Author.findAll();
    }
}

export default authorsQuery ;