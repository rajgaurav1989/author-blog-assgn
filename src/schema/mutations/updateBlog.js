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
	type: Blog,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        blog_content: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },

    resolve (source, args) {
        return models.Blog
            .findById(args.id)
            .then((blog) => {
                return blog.update({ blog_content : args.blog_content });
        });
    }
}