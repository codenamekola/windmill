import React, { Component } from 'react';
import {graphql} from 'react-apollo';//for use in binding queries to this component

import { getClientsQuery } from '../querys/querys';

import ClientIssueDetails from './ClientIssueDetails';

class ClientList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null//we want to use this state to track when a client is clicked
        }
    }

    displayClients(){
        var data = this.props.data;//get all the data coming back from the query
        if(data.loading){//check if data is still loading
            return(<div>Loading clients data...</div>);
        }else{
            return data.customers.map(customer => {
                return(//for each customer in customers, display as list item
                    <li key={customer.id} onClick={(e)=>{this.setState({selected:customer.id})}}>{customer.name}</li>
                );
            });
        }
    }
    render() {
        return (
            <div>
                <ul id="client-list">
                    {this.displayClients()}
                </ul>
                <ClientIssueDetails cid={this.state.selected}></ClientIssueDetails>
            </div>
        );
    }
}
//bind this component to queries
export default graphql(getClientsQuery)(ClientList);