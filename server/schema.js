import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

import {QueryPerson, MutationPerson} from './schemas/person';
import {QueryPosts} from './schemas/post';

export const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'Root query object',
    fields: () => {
      return {
        people: QueryPerson,
        posts: QueryPosts
      };
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutations',
    description: 'Functions to set stuff',
    fields () {
      return {...MutationPerson};
    }
  })
});

