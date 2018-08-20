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
import BlogInput from '../bloginputtype' ;
import AuthorInput from '../authorinputtype' ;

export default {
	type : Author,
    args : {
        id : {
            type : new GraphQLNonNull(GraphQLInt)
        }
    },

    resolve (source, args) {
        return models.Author
            .findById(args.id)
            .then((oldAuthor) => {                          
                return oldAuthor.destroy({ force: true });
        });
    }
}