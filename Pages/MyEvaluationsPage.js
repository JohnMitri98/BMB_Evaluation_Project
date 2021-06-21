import React from 'react';
import {Redirect, Switch} from 'react-router-dom';
//import EvaluationsTable from '../Components/EvaluationsTable'

export default class MyEvaluationsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            Evaluations: []
        }
    }

    render() {
        return (
            <div style = {this.props.style}>
                <button onClick = {this.props.history[1]}>
                    Back
                </button>
                <h1>This is the My Evaluations Page</h1>
                <Switch>
                    {this.state.redirect}
                </Switch>
            </div>
        );
    }

    componentDidMount() {
        if((this.props.loggedIn + "") === "false") {
            this.props.history[0]("/");
            this.props.history[0]("/UserView");
            this.props.history[0]("/UserView/MyEvaluations");
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
    }

    /*async componentDidMount() {
        let tempEvaluations = [];
        const response = await fetch(`/API/getEvaluationsDone-${this.props.ID}`);
        if(response) {
            const body = await response.json();
            if(body.Evaluations) {
                tempEvaluations = body.Evaluations;
            }
        }
        this.setState({
            Evaluations: tempEvaluations
        });
    }*/

}