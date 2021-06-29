import React from 'react';

export default class DetailsTable extends React.Component {

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
                <th style = {{textAlign: "center"}}>First_Name</th>
                <th style = {{textAlign: "center"}}>Last_Name</th>
                <th style = {{textAlign: "center"}}>Username_Email</th>
                <th style = {{textAlign: "center"}}>Password</th>
                <th style = {{textAlign: "center"}}>Manager</th>
                <th style = {{textAlign: "center"}}>Speciality</th>
                <th style = {{textAlign: "center"}}>Position</th>
                <th style = {{textAlign: "center"}}>Roles_Id</th>
            </tr>
        );
    }

    renderTableData() {
        return this.props.Users.map((User, index) => {
            const {First_Name,
                Last_Name,
               Username_Email,
                Password,
                Manager,
                Speciality,
                Position,
                Roles_Id
            } = User;
            return (
                <tr key = {index}>
                    <td style = {{textAlign: "center"}}>{Evaluation_ID}</td>
                    <td id = "Supervisor" style = {{textAlign: "center"}}>{First_Name + " " + Last_Name}</td>
                    <td style = {{textAlign: "center"}}>{Username_Email}</td>
                    <td style = {{textAlign: "center"}}>{Password}</td>
                    <td style = {{textAlign: "center"}}>{Manager}</td>
                    <td style = {{textAlign: "center"}}>{Speciality}</td>
                    <td style = {{textAlign: "center"}}>{Position}</td>
                    <td style = {{textAlign: "center"}}>{Roles_Id}</td>
                </tr>
            );
        });
    }

}