import React from 'react';

export default class UserTable extends React.Component {

    constructor(props) {
        super(props);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.state = {
            redirect: null
        };
    }

    render() {
        return(
            <table>
                <tbody>
                    {this.renderTableHeader()}
                    {this.renderTableData()}
                </tbody>
            </table>
        );
    }

    renderTableHeader() {
        return (
            <tr>
                <th style = {{textAlign: "center"}}>Name</th>
                <th style = {{textAlign: "center"}}>Username/Email</th>
                <th style = {{textAlign: "center"}}>Password</th>
                <th style = {{textAlign: "center"}}>Manager</th>
                <th style = {{textAlign: "center"}}>Specialty</th>
                <th style = {{textAlign: "center"}}>Position</th>
                <th style = {{textAlign: "center"}}>Role</th>
            </tr>
        );
    }

    renderTableData() {
        return this.props.Users.map((User, index) => {
            const {First_Name,
                Last_Name,
                Username_Email,
                Password,
                ManagerName,
                Specialty,
                Position,
                Roles_ID
            } = User;
            return (
                <tr key = {index}>
                    <td style = {{textAlign: "center"}}>{First_Name + " " + Last_Name}</td>
                    <td style = {{textAlign: "center"}}>{Username_Email}</td>
                    <td style = {{textAlign: "center"}}>{Password}</td>
                    <td style = {{textAlign: "center"}}>{ManagerName ? ManagerName : ""}</td>
                    <td style = {{textAlign: "center"}}>{Specialty}</td>
                    <td style = {{textAlign: "center"}}>{Position}</td>
                    <td style = {{textAlign: "center"}}>{Roles_ID}</td>
                </tr>
            );
        });
    }

}