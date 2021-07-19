import React from 'react';
import {Redirect, Switch} from 'react-router-dom';
import RolesTable from '../Components/RolesTable';
import {Encrypt} from '../Encryption/Encryptor';
import {Decrypt} from '../Encryption/Decryptor';

export default class RolesPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            Roles: [],
            ColumnNames: [],
            ready: "notYet"
        }
        //this.goToSprint = this.goToSprint.bind(this);
    }

    render() {
        return (
            <div style = {this.props.style} class = "tableDiv">
                {(this.state.ready === "true") && <RolesTable style = {this.props.style} Roles = {this.state.Roles} ColumnNames = {this.state.ColumnNames} />}
                {(this.state.ready === "false") && <h1>No Roles yet</h1>}
                {(this.state.ready === "notYet") && <h1>Loading</h1>}
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
            await this.props.history[0]("/UserView/Roles");
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
        this.props.history[3]("/UserView/Roles");
        let tempColumnNames = [];
        let tempRoles = [];
        //var response = await fetch(`/API/getColumnNames/Roles`);
        /*if(response) {
            const body = await response.json();
            if(body.Columns) {
                tempColumnNames = body.Columns;
            }
        }*/
        let tempObj = {
            Table: Encrypt("Roles")
        };
        var response = await fetch(`/API/getColumnNames`, {
            method: 'SEARCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj)
        });
        if(response) {
            const body = await response.json();
            if(body.Columns) {
                tempColumnNames = body.Columns;
                tempColumnNames.forEach(column => {
                    for(const [key, value] of Object.entries(column)) {
                        column[key] = Decrypt(value);
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
            Roles: (tempRoles[0] ? tempRoles : []),
            ColumnNames: (tempColumnNames[0] ? tempColumnNames : []),
            ready: ((tempRoles[0] && tempColumnNames[0]) ? "true" : "false")
        });
    }

}