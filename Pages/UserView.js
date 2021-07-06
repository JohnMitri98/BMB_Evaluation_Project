import React from 'react';
import {Redirect, Switch} from 'react-router-dom';

export default class UserView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        };
    }

    render() {
        return (
            <div style = {this.props.style}>
                <h1>This is the Home Page!</h1>
                {/*((this.props.permissions.Details_View + "") === "true") && 
                    <button onClick = {() => this.redirectView("/Details")}>
                        Details
                    </button>
                */}
                {/*<button onClick = {() => this.redirectView("/MyProfile")}>
                    My Profile
                </button>*/}
                <Switch>
                    {this.state.redirect}
                </Switch>
            </div>
        );
    }

    async componentDidMount() {
        if((this.props.loggedIn + "") === "false") {
            this.props.history[0]("/");
            await this.props.history[0]("/UserView");
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
        this.props.history[3]("/UserView");
    }
}