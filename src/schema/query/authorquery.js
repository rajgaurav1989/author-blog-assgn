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

let authorQuery = {
    type : Author,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, args) {
        return models.Author.findById(args.id);
    }   
}

export default authorQuery ;