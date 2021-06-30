import React from 'react';

export default class RolesTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            Roles: this.props.Roles
        };
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
            </div>
        );
    }

    renderTableHeader() {
        return (
            <tr>
                {this.props.ColumnNames.map((Name, index) => {
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
                                    <input name = {key} type = "checkbox" checked = {Role[key]} onChange = {() => thisObj.handleChange(Role, key)} />
                                </td>
                            );
                        }
                    })}
                </tr>
            );
        });
    }

    handleChange(Role, key) {
        Role[key] = !Role[key];
        this.setState({});
        fetch(`/API/switchRoleView/${Role["ID"]}-${key}`);
    }

}