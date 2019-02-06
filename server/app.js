const express = require('express');
//bring in express graphql which allows express communicate with the graphql api
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema');

const app = express();

const port = process.env.port || 4000;
//connect to mlab mongodb database
mongoose.connect('mongodb://kolabobo:Armadillo1!@ds123645.mlab.com:23645/windmill',{useNewUrlParser:true});
//inform us when db connection is established
mongoose.connection.once('open',()=>{
    console.log('connected to db');
});
//use the grahqlhttp object as middleware
app.use('/graphql',graphqlHTTP({//express will pass requests to this endpoint to graphql
    //this middleware needs a schema to inform express-graphql of how our data is structured
    schema: schema,//make use of this schema in the middleware
    graphiql: true//to enable front end testing of graphs from this /graphql route
}));

app.listen(port,()=>{
    console.log(`App is running on ${port}`);
});
