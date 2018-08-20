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

const BlogInput = new GraphQLInputObjectType({
  name: 'blog_input',
  fields: () => ({
      blog_content: { type: GraphQLString }
  })
});

export default BlogInput ;