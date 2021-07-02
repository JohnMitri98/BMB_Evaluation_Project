import React from 'react';
import {Redirect, Switch} from 'react-router-dom';
import EvaluationsTable from '../Components/EvaluationsTable';
import {Encrypt} from '../Encryption/Encryptor';
import {Decrypt} from '../Encryption/Decryptor';

export default class EvaluationsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Redirect: null,
            Evaluations: [],
            Subordinates: [],
            Ready: "notYet"
        }
        this.goToDetails = this.goToDetails.bind(this);
        this.goToEvaluate = this.goToEvaluate.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
    }

    render() {
        return (
            <div style = {this.props.style}>
                {(this.state.Ready === "true") && <EvaluationsTable Evaluations = {this.state.Evaluations} onDetailsButton = {[this.props.onDetailsButton, this.goToDetails]} refreshPage = {this.refreshPage} />}
                {(this.state.Ready === "false") && <h1>No Evaluations made yet</h1>}
                {(this.state.Ready === "notYet") && <h1>Loading</h1>}
                {(this.state.Subordinates[0] && <button onClick = {this.goToEvaluate} class = "addDetail">Evaluate</button>)}
                <Switch>
                    {this.state.Redirect}
                </Switch>
            </div>
        );
    }

    async componentDidMount() {
        if((this.props.loggedIn + "") === "false") {
            this.props.history[0]("/");
            this.props.history[0]("/UserView");
            this.props.history[0]("/UserView/Evaluations");
            this.setState({
                Redirect: <Redirect to = "/" />
            });
        }
        this.props.history[3]("/UserView/Evaluations");
        let tempEvaluations = [];
        let tempSubordinates = [];
        let tempObj = {
            UserID: Encrypt(this.props.ID),
            Admin: Encrypt((this.props.role === "Admin") + "")
        };
        var response = await fetch(`/API/getEvaluationsDone`, {
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
        let tempObj2 = {
            ManagerID: Encrypt(this.props.ID),
            Admin: Encrypt((this.props.role === "Admin") + "")
        };
        response = await fetch(`/API/getSubordinates`, {
            method: 'SEARCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj2)
        });
        if(response) {
            const body = await response.json();
            if(body.Subordinates) {
                tempSubordinates = body.Subordinates;
                tempSubordinates.forEach(subordinate => {
                    for(const [key, value] of Object.entries(subordinate)) {
                        subordinate[key] = Decrypt(value);
                    }
                });
            }
        }
        this.setState({
            Evaluations: (tempEvaluations[0] ? tempEvaluations : []),
            Subordinates: (tempSubordinates[0] ? tempSubordinates : []),
            Ready: (tempEvaluations[0] ? "true" : "false")
        });
    }

    goToDetails() {
        this.props.history[0]("/UserView/Evaluations");
        this.setState({
            Redirect: <Redirect to = "/UserView/Details" />
        });
    }

    goToEvaluate() {
        this.props.history[0]("/UserView/Evaluations");
        this.setState({
            Redirect: <Redirect to = "/UserView/Evaluations/CreateEvaluation" />
        });
    }

    async refreshPage() {
        let tempEvaluations = [];
        const response = await fetch(`/API/getEvaluationsDone/${this.props.ID}`);
        if(response) {
            const body = await response.json();
            if(body.Evaluations) {
                tempEvaluations = body.Evaluations;
            }
        }
        this.setState({
            Evaluations: (tempEvaluations[0] ? tempEvaluations : []),
            Ready: (tempEvaluations[0] ? "true" : "false")
        });
    }

}