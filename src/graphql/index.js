import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, split, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import jwt_decode from 'jwt-decode';
import { useSelector } from '../redux/store';

import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

export default function GraphQlContainer({ children }) {
  const token = useSelector((state) => state.Token);

  function isExpired(token) {
    if (token != null) {
      const payload = jwt_decode(token);
      const currentDate = new Date().getTime() / 1000;
      return payload.exp - currentDate <= 0;
    } else {
      return false;
    }
  }

  // https://subscriptions.vumah.com/graphiqls

  // const httpLink = new HttpLink({ uri: `http://localhost:5000/graphql` });
  // const httpLink = createHttpLink({ uri: `https://vumah-web-api.herokuapp.com/graphql` });
  // const httpLink = createHttpLink({ uri: `http://vumah.api.webers-droid.com/graphql` });
  // const httpLink = new HttpLink({ uri: `https://vumah-api.herokuapp.com/graphql` });
  // const httpLink = new HttpLink({ uri: `https://subscriptions.us-east-2.elasticbeanstalk.com/graphql` });
  // const httpLink = new HttpLink({ uri: `http://vumahapi-env.eba-cefw247c.us-east-2.elasticbeanstalk.com/graphql` });
  const httpLink = new HttpLink({ uri: `https://api.vumah.com/graphql` });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'wss://subscriptions.vumah.com/graphql'
    })
  );

  // const wsLink = new GraphQLWsLink(
  //   createClient({
  //     url: 'wss://subscriptions.us-east-2.elasticbeanstalk.com/graphql'
  //   })
  // );

  // const wsLink = new GraphQLWsLink(
  //   createClient({
  //     url: 'ws://localhost:5000/graphql'
  //   })
  // );

  // const wsLink = new GraphQLWsLink(
  //   createClient({
  //     url: 'ws://localhost:8080/graphql'
  //   })
  // );

  const cache = new InMemoryCache();

  const authLink = setContext((_, { headers }) => {
    if (token != null && token !== '' && !isExpired(token)) {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`
        }
      };
    } else {
      return { headers };
    }
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink)
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
  });

  // const client = new ApolloClient({
  //   cache: cache,
  //   link: authLink.concat(httpLink)
  // });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
