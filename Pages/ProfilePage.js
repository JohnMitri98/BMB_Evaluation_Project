import React from 'react';
import {Redirect, Switch} from 'react-router';

export default class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        }
    }

    render() {
        return (
            <div style = {this.props.style}>
                <h1>This is My Profile Page</h1>
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
            await this.props.history[0]("/UserView/MyProfile");
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
        this.props.history[3]("/UserView/MyProfile");
    }

}