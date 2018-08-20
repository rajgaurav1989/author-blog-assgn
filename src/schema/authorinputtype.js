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

import BlogInput from './bloginputtype'

const AuthorInput = new GraphQLInputObjectType({
    name: 'author_input',
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString },        
        blogs: { type: new GraphQLList(BlogInput) }
    })
});

export default AuthorInput;