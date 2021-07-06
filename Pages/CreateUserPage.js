import React from 'react';
import {Switch, Redirect} from 'react-router-dom';
import UserCreationForm from '../Components/UserCreationForm';
import {Decrypt} from '../Encryption/Decryptor';

export default class CreateUserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            Correct: "notYet",
            Ready: false,
            Users: [],
            Roles: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchManagerName = this.searchManagerName.bind(this);
        this.searchRoleName = this.searchRoleName.bind(this);
    }

    render() {
        let warning = null;
        if((this.state.Correct + "") === "false") {
            warning = "Incorrect inputs, please try again";
        }
        return (
            <div style = {this.props.style}>
                <h1>This is the User Creation Page</h1>
                {(this.state.Ready === "true") && <UserCreationForm style = {this.props.style} onSubmit = {this.handleSubmit} Users = {this.state.Users} Roles = {this.state.Roles} />}
                {(this.state.Ready === "false") && <h1>Loading</h1>}
                {warning && 
                    <h1>{warning}</h1>
                }
                <Switch>
                    {this.state.redirect}
                </Switch>
            </div>
        );
    }

    handleSubmit(valid) {
        if(valid) {
            this.setState({
                Correct: "true"
            });
            this.props.history[1]();
        } else {
            this.setState({
                Correct: "false"
            });
        }
    }

    async componentDidMount() {
        if((this.props.loggedIn + "") === "false") {
            this.props.history[0]("/");
            this.props.history[0]("/UserView");
            await this.props.history[0]("/UserView/Users");
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
        this.props.history[3]("/UserView/Users/CreateUser");
        let tempUsers = [];
        let tempRoles = [];
        var response = await fetch(`/API/getUsers`);
        if(response) {
            const body = await response.json();
            if(body.Users) {
                tempUsers = body.Users;
                tempUsers.forEach(user => {
                    for(const [key, value] of Object.entries(user)) {
                        user[key] = Decrypt(value);
                    }
                });
                tempUsers.forEach(user => {
                    if(user.Manager) {
                        user.ManagerName = this.searchManagerName(user.Manager, tempUsers);
                    }
                    if(user.Roles_ID) {
                        user.Roles_ID = this.searchRoleName(user.Roles_ID, tempRoles)
                    }
                });
            }
        }
        response = await fetch(`/API/getRoles`);
        if(response) {
            const body = await response.json();
            if(body.Roles) {
                tempRoles = body.Roles;
                tempRoles.forEach(role => {
                    for(const [key, value] of Object.entries(role)) {
                        if(Decrypt(value) === "true") {
                            role[key] = true;
                        } else if(Decrypt(value) === "false") {
                            role[key] = false;
                        } else {
                            role[key] = Decrypt(value);
                        }
                    }
                });
            }
        }
        this.setState({
            Users: tempUsers,
            Roles: tempRoles,
            Ready: "true"
        });
    }

    searchManagerName(ManagerID, UserArray) {
        let tempReturn = "";
        UserArray.forEach(user => {
            if(user.ID === ManagerID) {
                tempReturn = user.First_Name + " " + user.Last_Name;
            }
        });
        return tempReturn;
    }

    searchRoleName(RoleID, RoleArray) {
        let tempReturn = "";
        RoleArray.forEach(role => {
            if(role.ID === RoleID) {
                tempReturn = role.Name + "";
            }
        });
        return tempReturn;
    }

}