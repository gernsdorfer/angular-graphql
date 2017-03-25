import ApolloClient from "apollo-client/ApolloClient";
import {createNetworkInterface} from "apollo-client";

export function getAppoloClientConfig () {
  return  new ApolloClient({
    networkInterface: createNetworkInterface({
      uri: 'http://localhost:3000/graphql' //TODO move to env
    }),
  });
}
