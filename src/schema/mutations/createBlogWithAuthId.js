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
import BlogInput from '../bloginputtype' ;
import AuthorInput from '../authorinputtype' ;

let createBlogWithAuthId = {
    type : Blog,
    args : {
        author_id : {
            type : new GraphQLNonNull(GraphQLInt)
        },
        blog_content : {
            type : new GraphQLNonNull(GraphQLString)
        }
    },

    resolve (source, args) {
        return models.Blog.create({
                author_id: args.author_id,
                blog_content: args.blog_content,
        });
    }
} ;

export default createBlogWithAuthId ;