import React from 'react';
import {Redirect, Switch} from 'react-router-dom';
import RolesTable from '../Components/RolesTable'

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
            <div style = {this.props.style}>
                {(this.state.ready === "true") && <RolesTable style = {this.props.style} Roles = {this.state.Roles} ColumnNames = {this.state.ColumnNames} />}
                {(this.state.ready === "false") && <h1>No Roles yet</h1>}
                {(this.state.ready === "notYet") && <h1>Loading</h1>}
                {/*<button onClick = {this.goToSprint} class = "addDetail">
                    Create Sprint
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
            this.props.history[0]("/UserView");
            this.props.history[0]("/UserView/Roles");
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
        this.props.history[3]("/UserView/Roles");
        let tempColumnNames = [];
        let tempRoles = [];
        var response = await fetch(`/API/getColumnNames/Roles`);
        if(response) {
            const body = await response.json();
            if(body.Columns) {
                tempColumnNames = body.Columns;
            }
        }
        response = await fetch(`/API/getRoles`);
        if(response) {
            const body = await response.json();
            if(body.Roles) {
                tempRoles = body.Roles;
            }
        }
        this.setState({
            Roles: (tempRoles[0] ? tempRoles : []),
            ColumnNames: (tempColumnNames[0] ? tempColumnNames : []),
            ready: ((tempRoles[0] && tempColumnNames[0]) ? "true" : "false")
        });
    }

    /*goToSprint() {
        this.props.history[0]("/UserView/Sprints");
        this.setState({
            redirect: <Redirect to = "/UserView/Sprints/CreateSprint" />
        });
    }*/

}