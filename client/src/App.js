import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';//would be used in making requests to graphql
import {ApolloProvider} from 'react-apollo';//helps react to interface and understand graphql
//components
import ClientList from './components/ClientList';
import AddClient from './components/AddClient';
//apollo client setup
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Windmill</h1>
          <p className="sub">Customer issue reporting sofware</p>
          <ClientList></ClientList>
          <AddClient></AddClient>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
