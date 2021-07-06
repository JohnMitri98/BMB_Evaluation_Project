import React from 'react';
import {Redirect, Switch} from 'react-router-dom';
import PerformanceTable from '../Components/PerformanceTable';
import {Encrypt} from '../Encryption/Encryptor';
import {Decrypt} from '../Encryption/Decryptor';


export default class PerformancePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            ready: "notYet"
        };
    }

    render() {
        return (
            <div style = {this.props.style}>
                {(this.state.ready === "true") && <PerformanceTable TotalEvaluations = {this.state.TotalEvaluations} PreviousEvaluation = {this.state.PreviousEvaluation} style = {this.props.style} />}
                {(this.state.ready === "false") && <h1>Not Evaluated Yet</h1>}
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
            await this.props.history[0]("/UserView/Performance");
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
        this.props.history[3]("/UserView/Performance");
        let tempTotalEvaluations = [];
        let tempPreviousEvaluation = {};
        let tempObj = {UserID: Encrypt(this.props.UserID)};
        const response = await fetch(`/API/getMyPerformance`, {
            method: 'SEARCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj)
        });
        if(response) {
            const body = await response.json();
            if(body.Evaluations) {
                tempTotalEvaluations = body.Evaluations.TotalEvaluations;
                tempPreviousEvaluation = body.Evaluations.PreviousEvaluation;
                tempTotalEvaluations.forEach(evaluation => {
                    for(const [key, value] of Object.entries(evaluation)) {
                        evaluation[key] = Decrypt(value);
                    }
                });
                tempPreviousEvaluation.forEach(evaluation => {
                    for(const [key, value] of Object.entries(evaluation)) {
                        evaluation[key] = Decrypt(value);
                    }
                });
            }
        }
        this.setState({
            TotalEvaluations: (tempTotalEvaluations[0] ? tempTotalEvaluations : []),
            PreviousEvaluation: (tempPreviousEvaluation ? tempPreviousEvaluation : []),
            ready: (tempTotalEvaluations[0] && tempPreviousEvaluation ? "true" : "false")
        });
    }

}