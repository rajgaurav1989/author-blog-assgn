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

import models from '../dbmodels/models';
import Author from './authortype';
import Blog from './blogtype' ;
import BlogInput from './bloginputtype' ;
import AuthorInput from './authorinputtype' ;
import author from './query/authorquery' ;
import blog from './query/blogquery' ;
import authors from './query/authorsquery' ;
import blogs from './query/blogsquery';
import createAuthor from './mutations/createAuthor';
import updateAuthor from './mutations/updateAuthor';
import removeAuthor from './mutations/removeAuthor';
import deleteBlog from './mutations/deleteBlog';
import updateBlog from './mutations/updateBlog';
import createBlogWithAuthId from './mutations/createBlogWithAuthId';

const Query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        author,
        blog,
        authors,
        blogs
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields () {
        return {
            createAuthor,            
           	updateAuthor,
            removeAuthor,
            deleteBlog,
            updateBlog,
           	createBlogWithAuthId
        };
    }
});


const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;