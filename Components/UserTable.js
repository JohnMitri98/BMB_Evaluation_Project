import React from 'react';
import {Encrypt} from '../Encryption/Encryptor';

export default class UserTable extends React.Component {

    constructor(props) {
        super(props);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
        this.state = {
            Users: this.props.Users
        };
    }

    render() {
        return(
            <div class = "tableDiv">
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
                <th style = {{textAlign: "center"}}>First Name</th>
                <th style = {{textAlign: "center"}}>Last Name</th>
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
        return this.state.Users.map((User, index) => {
            const {First_Name,
                Last_Name,
                Username_Email,
                Password,
                Manager,
                ManagerName,
                Specialty,
                Position,
                Roles_ID
            } = User;
            return (
                <tr key = {index}>
                    {/*<td style = {{textAlign: "center"}}>{First_Name}</td>
                    <td style = {{textAlign: "center"}}>{Last_Name}</td>
                    <td style = {{textAlign: "center"}}>{Username_Email}</td>
                    <td style = {{textAlign: "center"}}>{Password}</td>
                    <td style = {{textAlign: "center"}}>{ManagerName ? ManagerName : ""}</td>
                    <td style = {{textAlign: "center"}}>{Specialty}</td>
                    <td style = {{textAlign: "center"}}>{Position}</td>
                    <td style = {{textAlign: "center"}}>{Roles_ID}</td>*/}
                    <td>
                        <input type = "text" pattern = "([A-Z]|[a-z]|\\s)*" value = {First_Name} onChange = {(event) => this.handleDataChange(User, "First_Name", event)} onBlur = {() => this.submitUpdate(User, "First_Name")} class = "tableInput" style = {{width: "100px", fontSize: "14px"}} />
                    </td>
                    <td>
                        <input type = "text" pattern = "([A-Z]|[a-z]|\\s)*" value = {Last_Name} onChange = {(event) => this.handleDataChange(User, "Last_Name", event)} onBlur = {() => this.submitUpdate(User, "Last_Name")} class = "tableInput" style = {{width: "100px", fontSize: "14px"}} />
                    </td>
                    <td>
                        <input type = "text" pattern = "([A-Z]|[a-z]|[0-9]|_|#|@|$|.)*" value = {Username_Email} onChange = {(event) => this.handleDataChange(User, "Username_Email", event)} onBlur = {() => this.submitUpdate(User, "Username_Email")} class = "tableInput" style = {{width: "150px", fontSize: "14px"}} />
                    </td>
                    <td>
                        <input type = "text" value = {Password} onChange = {(event) => this.handleDataChange(User, "Password", event)} onBlur = {() => this.submitUpdate(User, "Password")} class = "tableInput" style = {{width: "150px", fontSize: "14px"}} />
                    </td>
                    <td>
                        <select onChange = {(event) => this.handleDataChange(User, "Manager", event)} style = {{width: "150px", fontSize: "16px"}} class = "tableSelect">
                            <option value = "" style = {{width: "150px", fontSize: "16px"}}>None</option>
                            {this.state.Users.map(User2 => <option selected = {(Manager === User2.ID) ? "selected" : ""} value = {User2.ID} style = {{width: "150px", fontSize: "16px"}}>{User2.First_Name + " " + User2.Last_Name}</option>)}
                        </select>
                    </td>
                    <td>
                        <input type = "text" value = {Specialty} onChange = {(event) => this.handleDataChange(User, "Specialty", event)} onBlur = {() => this.submitUpdate(User, "Specialty")} class = "tableInput" style = {{width: "100px", fontSize: "14px"}} />
                    </td>
                    <td>
                        <input type = "text" value = {Position} onChange = {(event) => this.handleDataChange(User, "Position", event)} onBlur = {() => this.submitUpdate(User, "Position")} class = "tableInput" style = {{width: "100px", fontSize: "14px"}} />
                    </td>
                    <td>
                        <select onChange = {(event) => this.handleDataChange(User, "Roles_ID", event)} style = {{width: "150px", fontSize: "16px"}} class = "tableSelect">
                            <option value = "">None</option>
                            {this.props.Roles.map(Role => <option value = {Role.ID} selected = {(Roles_ID === Role.ID) ? "selected" : ""}>{Role.Name + ""}</option>)}
                        </select>
                    </td>
                </tr>
            );
        });
    }

    handleDataChange(User, Field, Event) {
        if(Event.target.validity.valid) {
            User[Field] = Event.target.value;
            this.setState({});
        }
        if(Field === "Manager" || Field === "Roles_ID") {
            this.submitUpdate(User, Field);
        }
    }

    async submitUpdate(User, Field) {
        let tempChange = User[Field];
        if(Field !== "Manager" && Field !== "Roles_ID") {
            tempChange = '\'' + tempChange + '\'';
        }
        let tempObj = {
            Change: Encrypt(tempChange),
            Field: Encrypt(Field),
            UserID: Encrypt(User["ID"])
        };
        await fetch(`/API/updateUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj)
        });
    }

}