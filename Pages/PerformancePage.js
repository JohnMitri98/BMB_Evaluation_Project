import React from 'react';
import {Redirect, Switch} from 'react-router-dom';

export default class PerformancePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        }
        this.goBack = this.goBack.bind(this);
    }

    render() {
        if((this.props.loggedIn + "") === "false") {
            this.props.history[0]("/UserView/Performance")
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
        return (
            <div style = {this.props.style}>
                <button onClick = {this.goBack}>
                    Back
                </button>
                <h1>This is My Performance Page</h1>
                <Switch>
                    {this.state.redirect}
                </Switch>
            </div>
        );
    }

    goBack() {
        let redirectPath = this.props.history[1]();
        this.setState({
            redirect: <Redirect exact to = {redirectPath} />
        });
    }

}