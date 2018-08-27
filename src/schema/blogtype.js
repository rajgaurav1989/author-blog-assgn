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
import Author from './authortype';

const Blog = new GraphQLObjectType({
    name: 'blog',
    fields () {
        return {
            id: {
                type: GraphQLID,
                resolve (blog) {
                    return blog.id;
                }
            },
            author: {
                type: Author,
                resolve (blog) {                    
                    return models.Author.findById(blog.author_id);                    
                }
            },
            blog_content: {
                type: GraphQLString,
                resolve (blog) {
                    return blog.blog_content;
                }
            }
        };
    }
});

export default Blog ;