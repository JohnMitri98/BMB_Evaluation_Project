import React from 'react';
import {Redirect, Switch} from 'react-router';
import UserTable from '../Components/UserTable';

export default class UsersPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            Users: [],
            ready: "notYet"
        }
        this.goToUsers = this.goToUsers.bind(this);
        this.searchManagerName = this.searchManagerName.bind(this);
        this.searchRoleName = this.searchRoleName.bind(this);
    }

    render() {
        return (
            <div style = {this.props.style}>
                {(this.state.ready === "true") && <UserTable Users = {this.state.Users} style = {this.props.style} />}
                {(this.state.ready === "false") && <h1>No Users Listed</h1>}
                {(this.state.ready === "notYet") && <h1>Loading</h1>}
                <button onClick = {this.goToUsers} class = 'addDetail'>
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
            redirect: <Redirect exact to = {`/UserView/Users/CreateUser`} />
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
        this.props.history[3]("/UserView/Users");
        let tempUsers = [];
        let tempRoles = [];
        var response = await fetch(`/API/getRoles`);
        if(response) {
            const body = await response.json();
            if(body.Roles) {
                tempRoles = body.Roles;
            }
        }
        response = await fetch(`/API/getUsers`);
        if(response) {
            const body = await response.json();
            if(body.Users) {
                tempUsers = body.Users;
            }
        }
        tempUsers.forEach(User => {
            if(User.Manager) {
                User.ManagerName = this.searchManagerName(User.Manager, tempUsers);
            }
            if(User.Roles_ID) {
                User.Roles_ID = this.searchRoleName(User.Roles_ID, tempRoles)
            }
        });
        this.setState({
            Users: (tempUsers[0] ? tempUsers : []),
            ready: (tempUsers[0] ? "true" : "false")
        });
    }

    searchManagerName(ManagerID, UserArray) {
        for(var i = 0; i < UserArray.length; i++) {
            if(UserArray[i].ID === ManagerID) {
                return (UserArray[i].First_Name + " " + UserArray[i].Last_Name);
            }
        }
    }

    searchRoleName(RoleID, RoleArray) {
        for(var i = 0; i < RoleArray.length; i++) {
            if(RoleArray[i].ID === RoleID) {
                return (RoleArray[i].Name + "");
            }
        }
    }

}