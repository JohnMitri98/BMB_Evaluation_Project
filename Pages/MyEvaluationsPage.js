import React from 'react';
import {Redirect, Switch} from 'react-router-dom';
import MyEvaluationsTable from '../Components/MyEvaluationsTable'
import {Encrypt} from '../Encryption/Encryptor';
import {Decrypt} from '../Encryption/Decryptor';

export default class MyEvaluationsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            Evaluations: [],
            ready: "notYet"
        }
        this.goToDetails = this.goToDetails.bind(this);
    }

    render() {
        return (
            <div style = {this.props.style}>
                {(this.state.ready === "true") && <MyEvaluationsTable Evaluations = {this.state.Evaluations} onDetailsButton = {[this.props.onDetailsButton, this.goToDetails]} />}
                {(this.state.ready === "false") && <h1>No Evaluations yet</h1>}
                {(this.state.ready === "notYet") && <h1>Loading</h1>}
                <Switch>
                    {this.state.redirect}
                </Switch>
            </div>
        );
    }

    async componentDidMount() {
        if((this.props.loggedIn + "") === "false") {
            this.props.history[0]("/");
            this.props.history[0]("/UserView");
            this.props.history[0]("/UserView/MyEvaluations");
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
        this.props.history[3]("/UserView/MyEvaluations");
        let tempEvaluations = [];
        let tempObj = {EvaluatedID: Encrypt(this.props.ID)};
        const response = await fetch(`/API/getMyEvaluations`, {
            method: 'SEARCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj)
        });
        if(response) {
            const body = await response.json();
            if(body.Evaluations) {
                tempEvaluations = body.Evaluations;
                tempEvaluations.forEach(evaluation => {
                    for(const [key, value] of Object.entries(evaluation)) {
                        evaluation[key] = Decrypt(value);
                    }
                });
            }
        }
        this.setState({
            Evaluations: (tempEvaluations[0] ? tempEvaluations : []),
            ready: (tempEvaluations[0] ? "true" : "false")
        });
    }
    
    goToDetails() {
        this.props.history[0]("/UserView/MyEvaluations")
        this.setState({
            redirect: <Redirect to = "/UserView/Details" />
        });
    }

}