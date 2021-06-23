import React from 'react';
import {Redirect, Switch} from 'react-router-dom';
import PerformanceTable from '../Components/PerformanceTable';

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
                <button onClick = {this.props.history[1]}>
                    Back
                </button>
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
            this.props.history[0]("/UserView/Performance");
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
        let tempTotalEvaluations = [];
        let tempPreviousEvaluation = {};
        const response = await fetch(`/API/getMyPerformance-${parseInt(this.props.UserID)}`);
        if(response) {
            const body = await response.json();
            if(body.Evaluations) {
                tempTotalEvaluations = body.Evaluations.TotalEvaluations;
                tempPreviousEvaluation = body.Evaluations.PreviousEvaluation;
            }
        }
        this.setState({
            TotalEvaluations: (tempTotalEvaluations[0] ? tempTotalEvaluations : []),
            PreviousEvaluation: (tempPreviousEvaluation ? tempPreviousEvaluation : []),
            ready: (tempTotalEvaluations[0] && tempPreviousEvaluation ? "true" : "false")
        });
    }

}