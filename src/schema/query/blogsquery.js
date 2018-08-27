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

let blogsQuery = {
    type: new GraphQLList(Blog),
    resolve(root, args) {
        return models.Blog.findAll();
    }
}

export default blogsQuery;