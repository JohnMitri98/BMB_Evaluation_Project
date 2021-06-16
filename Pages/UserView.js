import React from 'react';
import {Redirect, Switch} from 'react-router-dom';

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
                redirect: <Redirect to = "/" />
            });
        }
        return (
            <div style = {this.props.style}>
                <Switch>
                    {this.state.redirect}
                </Switch>
                <h1>This is the UserView!</h1>
                <button onClick = {() => this.redirectEvaluations("/Evaluations")}>
                    Evaluations
                </button>
                <button onClick = {() => this.redirectEvaluations("/MyProfile")}>
                    My Profile
                </button>
                <button onClick = {() => this.redirectEvaluations("/MyEvaluations")}>
                    My Evaluations
                </button>
                <button onClick = {() => this.redirectEvaluations("/Performance")}>
                    My Performance
                </button>
                <button onClick = {() => this.redirectEvaluations("/Details")}>
                    Details
                </button>
            </div>
        );
    }

    redirectEvaluations(redirection) {
        this.setState({
            redirect: <Redirect exact to = {`/UserView${redirection}`} />
        });
    }
}