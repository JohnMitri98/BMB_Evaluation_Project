import React from 'react';
import {Encrypt} from '../Encryption/Encryptor';

export default class UserCreationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            User: {
                First_Name: "",
                Last_Name: "",
                Username_Email: "",
                Password: "",
                Manager: "",
                Specialty: "",
                Position: "",
                Roles_ID: ""
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
    }

    render() {
        const {First_Name,
            Last_Name,
            Username_Email,
            Password,
            Manager,
            Specialty,
            Position,
            Roles_ID
        } = this.state.User;
        return (
            <form onSubmit = {this.handleSubmit} class = "createUser">
                <div style = {this.props.style}>
                    <div>
                        <label>
                           First Name:* 
                           <input type = "text" pattern = "([A-Z]|[a-z]|\\s)*" value = {First_Name} onChange = {(event) => this.handleDataChange("First_Name", event)} class = "tableInput" style = {{width: "150px", fontSize: "14px", marginLeft: "10px"}} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Last Name:* 
                            <input type = "text" pattern = "([A-Z]|[a-z]|\\s)*" value = {Last_Name} onChange = {(event) => this.handleDataChange("Last_Name", event)} class = "tableInput" style = {{width: "150px", fontSize: "14px", marginLeft: "10px"}} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Username/Email: 
                            <input type = "text" pattern = "([A-Z]|[a-z]|[0-9]|_|#|@|$|.)*" value = {Username_Email} onChange = {(event) => this.handleDataChange("Username_Email", event)} class = "tableInput" style = {{width: "150px", fontSize: "14px", marginLeft: "10px"}} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password: 
                            <input type = "text" pattern = "([A-Z]|[a-z]|[0-9]|_|#|@|$|.)*" value = {Password} onChange = {(event) => this.handleDataChange("Password", event)} class = "tableInput" style = {{width: "150px", fontSize: "14px", marginLeft: "10px"}} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Manager: 
                            <select onChange = {(event) => this.handleDataChange("Manager", event)} style = {{width: "auto", fontSize: "16px", marginLeft: "10px"}} class = "tableSelect">
                                <option value = "">None</option>
                                {this.props.Users.map(User => <option selected = {(Manager === User.ID) ? "selected" : ""} value = {User.ID}>{User.First_Name + " " + User.Last_Name}</option>)}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Specialty: 
                            <input type = "text" value = {Specialty} onChange = {(event) => this.handleDataChange("Specialty", event)} class = "tableInput" style = {{width: "150px", fontSize: "14px", marginLeft: "10px"}} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Position: 
                            <input type = "text" value = {Position} onChange = {(event) => this.handleDataChange("Position", event)} class = "tableInput" style = {{width: "150px", fontSize: "14px", marginLeft: "10px"}} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Role: 
                            <select onChange = {(event) => this.handleDataChange("Roles_ID", event)} style = {{width: "auto", fontSize: "16px", marginLeft: "10px"}} class = "tableSelect">
                                <option value = "">None</option>
                                {this.props.Roles.map(Role => <option value = {Role.ID} selected = {(Roles_ID === Role.ID) ? "selected" : ""}>{Role.Name + ""}</option>)}
                            </select>
                        </label>
                    </div>
                    <div>
                        <input type = "submit" value = "Add" onSubmit = {this.onSubmit}/>
                    </div>
                </div>

            </form>
        )
    }
    async handleSubmit(e) {
        e.preventDefault();
        let {First_Name, Last_Name, Username_Email, Password, Manager, Specialty, Position, Roles_ID} = this.state.User;

        if(First_Name === "" || Last_Name === "") {
            this.props.onSubmit(false);
        } else {
            let tempObj = {
                User: {
                    First_Name: Encrypt(First_Name),
                    Last_Name: Encrypt(Last_Name),
                    Username_Email: Encrypt(Username_Email),
                    Password: Encrypt(Password),
                    Manager: Encrypt(Manager),
                    Specialty: Encrypt(Specialty),
                    Position: Encrypt(Position),
                    Roles_ID: Encrypt(Roles_ID)
                }
            };
            await fetch('/API/insertUser', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempObj)
            });
            this.props.onSubmit(true);
        }
    };

    handleDataChange(Field, Event) {
        if(Event.target.validity.valid) {
            this.state.User[Field] = Event.target.value;
            this.setState({});
        }
    }

}