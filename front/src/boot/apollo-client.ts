import { boot } from 'quasar/wrappers';
import {
  ApolloClient, ApolloLink,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';
import { Loading, Notify } from 'quasar';
import { DefaultApolloClient } from '@vue/apollo-composable';

const authLink = setContext((_, { headers, ...context }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem('token') as string}`,
    },
    ...context,
  };
});

const defaultOptions: DefaultOptions = {
  query: {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all'
  },
};

const httpOptions = {
  uri: 'http://localhost:3000/graphql',
};
const httpLink = new HttpLink(httpOptions);
const errorLink = onError(({ graphQLErrors, networkError }) => {
  let error = '';
  if (graphQLErrors)
    graphQLErrors.map(({ message }) => {
      return (error = String(message));
    });
  if (networkError) error = 'Problème de réseau:' + networkError.message;
  Notify.create({
    message: error,
    type: 'warning',
  });
  Loading.hide();
});

const uploadLink = ApolloLink.split(
  (operation) => operation.getContext().hasUpload,
  createUploadLink(httpOptions) as never,
  httpLink
);
// Create the apollo client
const apolloClient = new ApolloClient({
  link:  errorLink.concat(authLink).concat(uploadLink),
  cache: new InMemoryCache({ addTypename: true }), // Cache implementation
  connectToDevTools: true,
  defaultOptions,
});

export default boot(({ app }) => {
  app.provide(DefaultApolloClient, apolloClient);
});
