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

import models from '../../dbmodels/models';
import Blog from '../blogtype' ;
import Author from '../authortype';

export default {
	type: new GraphQLList(Author),
    resolve(root, args) {
        return models.Author.findAll();
    }
}