import React from 'react';
import {Redirect, Switch} from 'react-router-dom';

export default class PerformancePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        };
    }

    render() {
        return (
            <div style = {this.props.style}>
                <button onClick = {this.props.history[1]}>
                    Back
                </button>
                <h1>This is My Performance Page</h1>
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
            this.props.history[0]("/UserView/Performance");
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
    }

}