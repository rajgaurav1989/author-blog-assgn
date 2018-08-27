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

let updateAuthor = {
    type: Author,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        name : {
            type : GraphQLString
        },
        email : {
            type : GraphQLString
        }
    },
    resolve (source, args) {
        return models.Author
            .findById(args.id)
            .then((newAuthor) => {                          
                return newAuthor.update({ name : args.name , email : args.email });
        });
    }
}

export default updateAuthor;