import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import {Post} from './post';

const mockPersons = require('../mock/persons.mock.json');
const mockPosts = require('../mock/posts.mock.json');

export const Person = new GraphQLObjectType({
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
          return new Promise((resolve, reject) => {
            resolve(
              mockPosts.filter((posts) => posts.personId === person.id)
            )
          });
        }
      }
    };
  }
});

export const QueryPerson = {
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
        mockPersons.filter((person) => {
          return Object.keys(args)
            .map((personKey) => person[personKey] === args[personKey])
            .reduce((start, current) => start === false ? start : current, true)
        })
      );
    });
  }
};


export const MutationPerson = {
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
      const newPerson = Object.assign({}, args, {id: mockPersons.length});
      mockPersons.push(newPerson);
      return new Promise((resolve, reject) => {
        resolve({id: newPerson.id});
      });
    }
  }
}
