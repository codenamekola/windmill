import React, { Component } from 'react';
import { graphql } from 'react-apollo';//for use in binding queries to this component

import { getClientQuery } from '../querys/querys';

class ClientIssueDetails extends Component {
    displayClientDetails(){
        const {customer} = this.props.data;
        if(customer){
            return(
                <div>
                    <h3>{customer.name}</h3>
                    <p>{customer.issueReported}</p>
                    <p>{customer.issueCategory.name}</p>
                    <p>Other clients in this category</p>
                    <ul className="other-clients">
                        {customer.issueCategory.customers.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>
                </div>
            )
        }else{
            return(
                <div>No customer selected...</div>
            )
        }
    }
    render() {
        return (
            <div id="client-issue-details">
                {this.displayClientDetails()}
            </div>
        );
    }
}
//bind this component to queries
export default graphql(getClientQuery,{
    options:(props)=>{
        return{
            variables:{
                id:props.cid
            }
        }
    }
})(ClientIssueDetails);