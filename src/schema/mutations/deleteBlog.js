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

let deleteBlog = {
    type: Blog,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve (source, args) {
        return models.Blog
            .findById(args.id)
            .then((blog) => {
            return blog.destroy({ force: true });
        });
    }
};

export default deleteBlog ;