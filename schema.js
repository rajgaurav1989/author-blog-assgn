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

import models from './models';

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


const BlogInput = new GraphQLInputObjectType({
  name: 'blog_input',
  fields: () => ({
      blog_content: { type: GraphQLString }
  })
});

const AuthorInput = new GraphQLInputObjectType({
    name: 'author_input',
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString },        
        blogs: { type: new GraphQLList(BlogInput) }
    })
});


const Query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        author: {
        	type : Author,
            args: {
		        id: {
		            type: new GraphQLNonNull(GraphQLID)
		        }
    		},
		    resolve(root, args) {
		        return models.Author.findById(args.id);
		    }
        },
        blog: {
            type: Blog,
		    args: {
		        id: {
		            type: new GraphQLNonNull(GraphQLID)
		        }
		    },
		    resolve(root, args) {
		        return models.Blog.findById(args.id);
		    }
        },
        authors : {
            type: new GraphQLList(Author),
            resolve(root, args) {
                return models.Author.findAll();
            }
        },
        blogs : {
            type: new GraphQLList(Blog),
            resolve(root, args) {
                return models.Blog.findAll();
            }
        }
    }
});


const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields () {
        return {
            createAuthor: {
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
                        }).save().then(function(newAuthor) {
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
            },

            
           	updateAuthor : {
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

           	},

            removeAuthor : {
           		type : Author,
           		args : {
           			id : {
           				type : new GraphQLNonNull(GraphQLInt)
           			}
           		},

           		resolve (source, args) {
                    return models.Author
                        .findById(args.id)
                        .then((oldAuthor) => {                        	
                        	return oldAuthor.destroy({ force: true });
                    });
                }
           		
           	},

            deleteBlog : {
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
            },

            updateBlog : {
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

            },

           	createBlogWithAuthId : {
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
           	}
        };
    }
});


const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;