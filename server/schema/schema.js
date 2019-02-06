const graphql = require('graphql');
//use destructuring to get utilities from graphql
const {GraphQLObjectType,GraphQLString,GraphQLID,GraphQLList,GraphQLNonNull,GraphQLSchema} = graphql;//this will help us define types of the data in our graph
const _ = require('lodash');

const Customer = require('../models/Customer');
const IssueCategory = require('../models/IssueCategory');
//next we define our graph objects and the data they hold and types of the data
const CustomerType = new GraphQLObjectType({
    name:'Customer',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        issueReported:{type:GraphQLString},
        //define related types
        issueCategory:{
            type:IssueType,//the type is the custom type as defined
            resolve(parent,args){
                //parent holds the returned data from root queries
                //hence we can get the issuecategory id from the parent
                //this is then used to find the appropriate issuecategory and return it
                //return _.find(issueCategories,{id:parent.issue_categoryId});
                return IssueCategory.findById(parent.issue_categoryId);
            }
        }
    })
});

const IssueType = new GraphQLObjectType({
    name:'Issue_Category',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        department:{type:GraphQLString},
        customers:{
            type:new GraphQLList(CustomerType),//since a category will have many customers, it needs to be a list with the type passed in as argument
            resolve(parent,args){
                //filter through customers and return all those whose issue category id equals the parent id
                //return _.filter(customers,{issue_categoryId:parent.id});
                return Customer.find({issue_categoryId:parent.id});
            }
        }
    })
});
//define entry points or root querys for entry into the graph
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        customer:{//entry point via customer
            type:CustomerType,//setting type of customertype lets it know what type to return
            args:{id:{type:GraphQLID}},//this defines what arguments we can add e.g. to get a specific customer when querying the entry point
            resolve(parent,args){
                //code here gets data from the app database or from any other source
                //parent can link to any defined relationships
                //args is used to collect any args entered by user at query of entrypoint

                //use lodash to use query dummy data
                //return _.find(customers,{id:args.id});
                return Customer.findById(args.id);
            }
        },
        customers:{//entry point to get all current customers
            type:new GraphQLList(CustomerType),
            resolve(parent,args){
                //return customers;
                return Customer.find({});
            }
        },
        issue_category:{
            type:IssueType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //return _.find(issueCategories,{id:args.id});
                return IssueCategory.findById(args.id);
            }
        },
        issue_categories:{
            type:new GraphQLList(IssueType),
            resolve(parent,args){
                //return issueCategories;
                return IssueCategory.find({});
            }
        }
    }
});
//mutations
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addIssueCategory:{
            type:IssueType,
            args:{//creating an issue category will need name and dapartment passed as args
                name:{type:new GraphQLNonNull(GraphQLString)},//graphqlnonnull ensures this property cannot be skipped
                department:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){//use the passed args to create new issue category
                let issueCategory = new IssueCategory({
                    name:args.name,
                    department:args.department
                });
                //save the issue category
                return issueCategory.save();
            }
        },
        addCustomer:{
            type:CustomerType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString)},
                issueReported: { type: new GraphQLNonNull(GraphQLString)},
                issue_categoryId: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let customer = new Customer({
                    name:args.name,
                    issueReported:args.issueReported,
                    issue_categoryId:args.issue_categoryId
                });
                return customer.save();
            }
        }
    }
});
//export the schema
module.exports = new GraphQLSchema({
    query: RootQuery,//queries can be made using this root query
    mutation: Mutation//mutations can be made using this mutation
});