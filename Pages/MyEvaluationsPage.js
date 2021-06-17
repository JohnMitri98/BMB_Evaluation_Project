import React from 'react';
import {Redirect, Switch} from 'react-router-dom';
import EvaluationsTable from '../Components/EvaluationsTable'

export default class MyEvaluationsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            Evaluations: []
        }
        this.goBack = this.goBack.bind(this);
    }

    render() {
        if((this.props.loggedIn + "") === "false") {
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
        return (
            <div style = {this.props.style}>
                <button onClick = {this.goBack}>
                    Back
                </button>
                <h1>This is the My Evaluations Page</h1>
                {/*{this.state.Evaluations[0] && <EvaluationsTable Evaluations = {this.state.Evaluations} />}*/}
                {/*<h1>{this.state.Evaluations[0] && this.state.Evaluations[0].ID + ""}</h1>*/}
                <Switch>
                    {this.state.redirect}
                </Switch>
            </div>
        );
    }

    goBack() {
        this.setState({
            redirect: <Redirect exact to = "/UserView" />
        });
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