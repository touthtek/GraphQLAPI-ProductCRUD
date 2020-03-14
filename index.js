const express = require('express');
const {graphql, buildSchema} = require('graphql');
const express_graphql = require('express-graphql');
const schema = require('./schema');
const {Query, Mutation} = require('./resolver'); 
const expressPlayground =
    require('graphql-playground-middleware-express').default;
const jwt = require('jsonwebtoken');
const app = express();


app.get('/', (req, res)=>{
  res.redirect('/query');
});

app.use('/query', express_graphql({
  schema : schema,
  rootValue : Query,
  graphiql : true
}))

app.use('/mutation', express_graphql({
  schema : schema,
  rootValue : Mutation,
  graphiql : true
}))

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log('graphql api server is runing on port '+port);

});




