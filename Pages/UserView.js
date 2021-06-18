import React from 'react';
import {Redirect, Switch} from 'react-router-dom';

export default class UserView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        };
        this.redirectView = this.redirectView.bind(this);
    }

    render() {
        if((this.props.loggedIn + "") === "false") {
            this.props.history[0]("/");
            this.props.history[0]("/UserView");
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
                {((this.props.permissions.Evaluation_View + "") === "true") && 
                    <button onClick = {() => this.redirectView("/Evaluations")}>
                        Evaluations
                    </button>
                }
                {/*((this.props.permissions.Details_View + "") === "true") && 
                    <button onClick = {() => this.redirectView("/Details")}>
                        Details
                    </button>
                */}
                <button onClick = {() => this.redirectView("/MyProfile")}>
                    My Profile
                </button>
                <button onClick = {() => this.redirectView("/MyEvaluations")}>
                    My Evaluations
                </button>
                <button onClick = {() => this.redirectView("/Performance")}>
                    My Performance
                </button>
                
            </div>
        );
    }

    redirectView(redirection) {
        this.props.history[0]("/UserView");
        this.setState({
            redirect: <Redirect exact to = {`/UserView${redirection}`} />
        });
    }
}