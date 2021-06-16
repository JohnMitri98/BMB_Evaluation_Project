import React from 'react';
import {Switch, Redirect} from 'react-router-dom';

export default class UserView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        };
        this.redirectEvaluations = this.redirectEvaluations.bind(this);
    }

    render() {
        if((this.props.loggedIn + "") === "false") {
            this.setState({
                redirect: <Redirect to = "../" />
            });
        }
        return (
            <div>
                <Switch>
                    {this.state.redirect}
                </Switch>
                <h1>This is the UserView!</h1>
                <button onClick = {this.redirectEvaluations}>Evaluations</button>
            </div>
        );
    }

    redirectEvaluations() {
        this.setState({
            redirect: <Redirect exact to = "/UserView/Evaluations" />
        });
    }
}