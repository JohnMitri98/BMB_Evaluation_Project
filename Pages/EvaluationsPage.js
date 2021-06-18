import React from 'react';
import {Redirect, Switch} from 'react-router-dom';
import EvaluationsTable from '../Components/EvaluationsTable';

export default class EvaluationsPage extends React.Component {

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
                <button onClick = {this.props.history[1]}>
                    Back
                </button>
                {(this.state.ready === "true") && <EvaluationsTable Evaluations = {this.state.Evaluations} EvaluatorName = {this.props.EvaluatorName} style = {this.props.style} onDetailsButton = {[this.props.onDetailsButton, this.goToDetails]} />}
                {(this.state.ready === "false") && <h1>No Evaluations made yet</h1>}
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
            this.props.history[0]("/UserView/Evaluations");
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
        let tempEvaluations = [];
        const response = await fetch(`/API/getEvaluationsDone-${this.props.ID}`);
        if(response) {
            const body = await response.json();
            if(body.Evaluations) {
                tempEvaluations = body.Evaluations;
            }
        }
        this.setState({
            Evaluations: tempEvaluations,
            ready: (tempEvaluations[0] ? "true" : "false")
        });
    }

    goToDetails() {
        this.props.history[0]("/UserView/Evaluations")
        this.setState({
            redirect: <Redirect to = "/UserView/Details" />
        });
    }

}