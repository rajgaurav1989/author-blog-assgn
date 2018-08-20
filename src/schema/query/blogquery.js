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
	type: Blog,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, args) {
        return models.Blog.findById(args.id);
    }
	
}