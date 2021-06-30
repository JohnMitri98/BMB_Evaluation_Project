import React from 'react';

export default class RolesTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            Roles: this.props.Roles,
            ColumnNames: this.props.ColumnNames,
            RoleText: "",
            ColumnNameText: "",
            warning: ""
        };
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.handlePermissionChange = this.handlePermissionChange.bind(this);
        this.handleNewRoleChange = this.handleNewRoleChange.bind(this);
        this.handleNewColumnChange = this.handleNewColumnChange.bind(this);
        this.addRole = this.addRole.bind(this);
        this.addColumn = this.addColumn.bind(this);
    }

    render() {
        return(
            <div>
            {/*<div class = "table-wrapper">*/}
                <table>
                {/*<table class = "fl-table">*/}
                    <tbody>
                        {this.renderTableHeader()}
                        {this.renderTableData()}
                    </tbody>
                </table>
                <div>
                    <label>
                        New Role: 
                    </label>
                    <input type = "text" value = {this.state.RoleText + ""} onChange = {this.handleNewRoleChange}/>
                    <input type = "submit" value = "Add Role" onClick = {this.addRole} />
                </div>
                <div>
                    <label>
                        New Column: 
                    </label>
                    <input type = "text" pattern = "([A-Z]|[a-z]|_)*" value = {this.state.ColumnNameText + ""} onChange = {this.handleNewColumnChange}/>
                    <input type = "submit" value = "Add Column" onClick = {this.addColumn} />
                </div>
                <div>
                    <h1>{this.state.warning}</h1>
                </div>
            </div>
        );
    }

    renderTableHeader() {
        return (
            <tr>
                {this.state.ColumnNames.map((Name, index) => {
                    if(index !== 0) {
                        return(
                            <th>{Name.COLUMN_NAME + ""}</th>
                        );
                    }
                })}
            </tr>
        );
    }

    renderTableData() {
        const thisObj = this;
        return this.state.Roles.map(function (Role, index) {
            const RolesIndex = index;
            return(
                <tr key = {index}>
                    {Object.keys(Role).map(function (key, index) {
                        if(index === 1) {
                            return <td>{Role[key] + ""}</td>;
                        } else if(index > 1) {
                            return (
                                <td>
                                    <input name = {key} type = "checkbox" checked = {Role[key]} onChange = {() => thisObj.handlePermissionChange(Role, key)} />
                                </td>
                            );
                        }
                    })}
                </tr>
            );
        });
    }

    handlePermissionChange(Role, key) {
        Role[key] = !Role[key];
        this.setState({});
        fetch(`/API/switchRoleView/${Role["ID"]}-${key}`);
    }

    handleNewRoleChange(event) {
        this.setState({
            RoleText: event.target.value + ""
        });
    }

    handleNewColumnChange(event) {
        if(event.target.validity.valid) {
            this.setState({
                ColumnNameText: event.target.value + ""
            });
        }
    }

    async addRole() {
        let tempResult = [];
        if(this.state.RoleText === "") {
            this.setState({
                warning: "Invalid Role Name",
                RoleText: ""
            });
        } else {
            await fetch(`/API/insertRole/${this.state.RoleText + ""}`);
            const response = await fetch('/API/getRoles')
            if(response) {
                const body = await response.json();
                if(body.Roles) {
                    tempResult = body.Roles;
                }
            }
            this.setState({
                Roles: tempResult,
                RoleText: "",
                ColumnNameText: "",
                warning: ""
            });
        }
    }

    async addColumn() {
        let tempRoles = [];
        let tempColumnNames = [];
        if(this.state.ColumnNameText === "") {
            this.setState({
                warning: "Invalid Column Name",
                ColumnNameText: ""
            });
        } else {
            await fetch(`/API/insertRoleColumn/${this.state.ColumnNameText + ""}`);
            var response = await fetch('/API/getColumnNames/Roles')
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
                Roles: tempRoles,
                ColumnNames: tempColumnNames,
                RoleText: "",
                ColumnNameText: "",
                warning: ""
            });
        }
    }

}