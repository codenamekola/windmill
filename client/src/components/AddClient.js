import React, { Component } from 'react';
import { graphql,compose } from 'react-apollo';//for use in binding queries to this component

import { getIssuesQuery, addClientIssue, getClientsQuery} from '../querys/querys';

class AddClient extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            issueReported:'',
            issue_categoryId:''
        }
    }

    displayCategories() {
        var data = this.props.getIssuesQuery;//get all the data coming back from the query
        if (data.loading) {//check if data is still loading
            return (<option>Loading categories data...</option>);
        } else {
            return data.issue_categories.map(issue => {
                return (//for each customer in customers, display as list item
                    <option key={issue.id} value={issue.id}>{issue.name}</option>
                );
            });
        }
    }

    submitForm(e){
        e.preventDefault();
        this.props.addClientIssue({
            variables:{
                name: this.state.name,
                issueReported: this.state.issueReported,
                issue_categoryId: this.state.issue_categoryId
            },
            //refetch a query in other to refresh client list
            refetchQueries: [{ query: getClientsQuery}]
        });
    }

    render() {
        return (
            <form id="add-client" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                   <label>Customer Name:</label>
                   <input type="text" onChange={(e)=>this.setState({name:e.target.value})}/>
                </div>
                <div className="field">
                    <label>Issue Reported:</label>
                    <textarea onChange={(e) => this.setState({ issueReported: e.target.value })}/>
                </div>
                <div className="field">
                    <label>Issue Category:</label>
                    <select onChange={(e) => this.setState({ issue_categoryId: e.target.value })}>
                        {this.displayCategories()}
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
}
//bind this component to queries
export default compose(//we are using compose in other to package multiple queries for this component
    //giving the queries a name enables us to access their individual data as we wish
    graphql(getIssuesQuery,{name:"getIssuesQuery"}),
    graphql(addClientIssue,{name:"addClientIssue"})
    )(AddClient);