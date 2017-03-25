import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import {Person} from './person';

const mockPersons = require('../mock/persons.mock.json');
const mockPosts = require('../mock/posts.mock.json');


export const Post = new GraphQLObjectType({
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
          return new Promise((resolve, reject) => {
            resolve(
              mockPersons
                .filter((person) => person.id === post.personId)
                .reduce((currentPerson, nextPerson) => nextPerson, null)
            )
          });
        }
      }
    };
  }
});

export const QueryPosts = {
  type: new GraphQLList(Post),
  resolve (root, args) {
    return new Promise((resolve, reject) => {
      resolve(mockPosts);
    });
  }
}
