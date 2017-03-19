import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';


const person = require('./persons.mock.json');

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'Blog post',
  fields () {
    return {
      title: {
        type: GraphQLString,
        resolve (post) {
          return post.title;
        }
      },
      content: {
        type: GraphQLString,
        resolve (post) {
          return post.content;
        }
      },
      person: {
        type: Person,
        resolve (post) {
          return post.getPerson();
        }
      }
    };
  }
});

const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'This represents a Person',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve (person) {
          return person.id;
        }
      },
      firstName: {
        type: GraphQLString,
        resolve (person) {
          return person.firstName;
        }
      },
      lastName: {
        type: GraphQLString,
        resolve (person) {
          return person.lastName;
        }
      },
      email: {
        type: GraphQLString,
        resolve (person) {
          return person.email;
        }
      },
      posts: {
        type: new GraphQLList(Post),
        resolve (person) {
          return person.getPosts();
        }
      }
    };
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      people: {
        type: new GraphQLList(Person),
        args: {
          id: {
            type: GraphQLInt
          },
          email: {
            type: GraphQLString
          }
        },
        resolve (root, args) {
          return new Promise((resolve, reject) => {
            resolve(
              person.filter((person) => {
                return Object.keys(args)
                  .map((personKey) => person[personKey] === args[personKey])
                  .reduce((start, current) => start === false ? start : current, true)
              })
            );
          });
        }
      },
      posts: {
        type: new GraphQLList(Post),
        resolve (root, args) {
          return new Promise((resolve, reject) => {
            resolve([{id: 1, email: 'test@mail.com'}]);
          });// Db.models.post.findAll({where: args});
        }
      }
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Functions to set stuff',
  fields () {
    return {
      addPerson: {
        type: Person,
        args: {
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve (source, args) {
          return new Promise((resolve, reject) => {
            resolve([{id: 1, email: 'test@mail.com'}]);
          });
          /*Db.models.person.create({
           firstName: args.firstName,
           lastName: args.lastName,
           email: args.email.toLowerCase()
           });*/
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
