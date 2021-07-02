import React from 'react';
import {Encrypt} from '../Encryption/Encryptor';
import {Decrypt} from '../Encryption/Decryptor';

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
            <div style = {this.props.style}>
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
        return this.state.Roles.map((Role, index) => {
            return(
                <tr key = {index}>
                    {Object.keys(Role).map((key, index) => {
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
        let tempObj = {
            RoleID: Encrypt(parseInt(Role["ID"])),
            Column: Encrypt(key)
        };
        fetch(`/API/switchRoleView`, {
            method: 'SEARCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj)
        });
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
            let tempObj = {
                RoleName: Encrypt(this.state.RoleText)
            }
            await fetch(`/API/insertRole`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempObj)
            });
            const response = await fetch(`/API/getRoles`);
            if(response) {
                const body = await response.json();
                if(body.Roles) {
                    tempResult = body.Roles;
                    tempResult.forEach(role => {
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
        let tempCheck = false;
        this.state.ColumnNames.forEach(Name => {
            if(this.state.ColumnNameText === (Name.COLUMN_NAME + "")) {
                tempCheck = true;
            }
        });
        if(this.state.ColumnNameText === "" || tempCheck) {
            this.setState({
                warning: "Invalid Column Name",
                ColumnNameText: ""
            });
        } else {
            //await fetch(`/API/insertRoleColumn/${this.state.ColumnNameText + ""}`);
            let tempObj = {
                ColumnName: Encrypt(this.state.ColumnNameText + "")
            }
            await fetch(`/API/insertRoleColumn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempObj)
            });
            let tempObj2 = {
                Table: Encrypt("Roles")
            };
            var response = await fetch(`/API/getColumnNames`, {
                method: 'SEARCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempObj2)
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
                Roles: tempRoles,
                ColumnNames: tempColumnNames,
                RoleText: "",
                ColumnNameText: "",
                warning: ""
            });
        }
    }

}