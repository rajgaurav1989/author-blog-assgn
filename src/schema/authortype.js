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

import models from '../dbmodels/modelHelper';
import Blog from './blogtype' ;

const Author = new GraphQLObjectType({
    name: 'author',
    fields () {
        return {
            id: {
                type: GraphQLID,
                resolve (author) {
                    return author.id;
                }
            },
            name: {
                type: GraphQLString,
                resolve (author) {
                    return author.name;
                }
            },
            email: {
                type: GraphQLString,
                resolve (author) {
                    return author.email;
                }
            },
            blogs: {
                type: new GraphQLList(Blog),
                resolve(author) {                    
                    return models.Blog.findAll({ where: { author_id: author.id } });
                }
            }
        };
    }
});

export default Author;