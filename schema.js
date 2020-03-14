const express = require('express');
const {graphql, buildSchema} = require('graphql');
const schema = buildSchema(`

type Query{
  getallproduct : [Product]
  getproductbyid(id : String) : Product
  message : String
}

type Mutation{
 insert : String
 createproduct(input : ProductInput) : ReturnMessage
 updateproduct(input : ProductInput) : ReturnMessage
 deleteproduct(id : String) : ReturnMessage
}


type Product{
  id : String,
  name : String,
  category : String,
  color : String,
  available : String,
  qantity : Int,
  isactive : Boolean
}

input ProductInput{
  id : String,
  name : String!,
  category : String!,
  color : String!,
  available : String!,
  qantity : Int!,
  isactive : Boolean!

}



type ReturnMessage{
  isSuccess : String,
  message : String
}


`);

module.exports = schema;