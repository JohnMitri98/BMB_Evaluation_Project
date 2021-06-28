import React from 'react';


export default class User extends React.Component {

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
            <div>
            
                <table>
              
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
                <th>First_Name</th>
                <th> Last_Name</th>
                <th> Username_Email</th>
                <th>Password</th>
                <th>Manager</th>
                <th>Speciality</th>
                <th>Position</th>
                <th>Roles_Id</th>
            </tr>
        );
    }

    renderTableData() {
       
            return (
                <tr key = {index}>
                    <th>{First_Name}</th>
                <th> {Last_Name}</th>
                <th> {Username_Email}</th>
                <th>{Password}</th>
                <th>{Manager}</th>
                <th>{Speciality}</th>
                <th>{Position}</th>
                <th>{Roles_Id}</th>
                </tr>
            );
        }
    }

