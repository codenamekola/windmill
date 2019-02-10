import { gql } from 'apollo-boost';//for use in creating qraphql queries

const getIssuesQuery = gql`
{
    issue_categories{
        id
        name
    }
}
`
const getClientsQuery = gql`
{
    customers{
        id
        name
    }
}
`
//we are using query variables below in other to get dynamic passed data from the frontend
const addClientIssue = gql`
mutation($name:String!,$issueReported:String!,$issue_categoryId:ID!){
    addCustomer(name:$name,issueReported:$issueReported,issue_categoryId:$issue_categoryId){
        name
        id
    }
}
`

const getClientQuery = gql`
   query($id:ID){
       customer(id:$id){
           id
           name
           issueReported
           issueCategory{
               id
               name
               department
               customers{
                   id
                   name
               }
           }
       }
   } 
`

export {getClientsQuery,getIssuesQuery,addClientIssue,getClientQuery}