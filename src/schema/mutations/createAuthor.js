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


let createAuthor = {
    type: Author,
    args: {
        author: {
            type: AuthorInput
        }
    },
    resolve (source, args) {
            return models.Author.build({
                name: args.author.name,
                email: args.author.email
            }).save().then((newAuthor) => {
                    const blogs = args.author.blogs || [];
                    blogs.forEach((blog) => {
                        models.Blog.create({
                            author_id: newAuthor.id,
                            blog_content: blog.blog_content,
                        });
                    });

            return models.Author.findById(newAuthor.id);
        });
    }
};

export default createAuthor ;