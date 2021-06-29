import React from 'react';
import {Redirect, Switch} from 'react-router';
import UserTable from '../Components/UserTable';

export default class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            Users: [],
            ready: "notYet"
        }
        this.goToUsers = this.goToUsers.bind(this);
    }

    render() {
        return (
            <div style = {this.props.style}>
                {(this.state.ready === "true") && <User Users = {this.state.Users} style = {this.props.style} />}
                {(this.state.ready === "false") && <h1>No Details Listed</h1>}
                {(this.state.ready === "notYet") && <h1>Loading</h1>}
                <button onClick = {this.goToUsers} class = 'addUser'>
                    Add User
                </button>
                <Switch>
                    {this.state.redirect}
                </Switch>
            </div>
        );
    }

    goToUsers() {
        this.props.history[0]("/UserView/Users");
        this.setState({
            redirect: <Redirect exact to = {`/UserView/Users/DetailsEdit`} />
        });
    }

    async componentDidMount() {
        if((this.props.loggedIn + "") === "false") {
            this.props.history[0]("/");
            this.props.history[0]("/UserView");
            this.props.history[0]("/UserView/Users");
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
        let tempDetails = [];
        const response = await fetch(`/API/getUsers`);
        if(response) {
            const body = await response.json();
            if(body.Users) {
                tempDetails = body.Users;
            }
        }
        this.setState({
           Users: (tempUsers[0] ? tempUsers : []),
            ready: (tempUsers[0] ? "true" : "false")
        });
    }

}
