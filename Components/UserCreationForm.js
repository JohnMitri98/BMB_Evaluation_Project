import React from 'react';

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
                Speciality: "",
                Position: "",
                Roles_ID: ""
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleUsernameEmailChange = this.handleUsernameEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleManagerChange = this.handleManagerChange.bind(this);
        this.handleSpecialityChange = this.handleSpecialityChange.bind(this);
        this.handlePositionChange = this.handlePositionChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
    }

    render() {
        return (
            <form onSubmit = {this.handleSubmit} class = "Evaluation">
                <div style = {this.props.style}>
                <div>
                        <label>
                           First Name:* 
                            <input type = "text" value = {this.state.User.First_Name} onChange = {this.handleFirstNameChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Last Name:* 
                            <input type = "text" value = {this.state.User.Last_Name} onChange = {this.handleLastNameChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Username/Email: 
                            <input type = "text" value = {this.state.User.Username_Email} onChange = {this.handleUsernameEmailChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password: 
                            <input type = "password" value = {this.state.User.Password} onChange = {this.handlePasswordChange}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Manager: 
                            <select onChange = {this.handleManagerChange}>
                                <option value = "">None</option>
                                {this.props.Users.map(User => <option value = {User.ID}>{User.First_Name + " " + User.Last_Name}</option>)}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Speciality: 
                            <input type = "text" value = {this.state.User.Speciality} onChange = {this.handleSpecialityChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Position: 
                            <input type = "text" value = {this.state.User.Position} onChange = {this.handlePositionChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Role: 
                            <select onChange = {this.handleRoleChange}>
                                <option value = "">None</option>
                                {this.props.Roles.map(Role => <option value = {Role.ID}>{Role.Name + ""}</option>)}
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
        let {First_Name, Last_Name,Username_Email, Password, Manager, Speciality, Position, Roles_ID} = this.state.User;
        if(Username_Email === "") {
            Username_Email = null;
        }
        if(Password === "") {
            Password = null;
        }
        if(Manager === "") {
            Manager = null;
        }
        if(Speciality === "") {
            Speciality = null;
        }
        if(Position === "") {
            Position = null;
        }
        if(Roles_ID === "") {
            Roles_ID = null;
        }

        if(First_Name === "" || Last_Name === "") {
            this.props.onSubmit(false);
        } else {
            let tempObj = {
                User: {
                    First_Name: First_Name,
                    Last_Name: Last_Name,
                    Username_Email: Username_Email,
                    Password: Password,
                    Manager: Manager,
                    Speciality: Speciality,
                    Position: Position,
                    Roles_ID: Roles_ID
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

    handleFirstNameChange(event) {
        let {Last_Name, Username_Email, Password, Manager, Speciality, Position, Roles_ID} = this.state.User;
        let tempUser = {
            First_Name: event.target.value,
            Last_Name: Last_Name,
            Username_Email: Username_Email,
            Password: Password,
            Manager: Manager,
            Speciality: Speciality,
            Position: Position,
            Roles_ID: Roles_ID
        }
        this.setState({User: tempUser});
    }

    handleLastNameChange(event) {
        let {First_Name, Username_Email, Password, Manager, Speciality, Position, Roles_ID} = this.state.User;
        let tempUser = {
            First_Name: First_Name,
            Last_Name: event.target.value,
            Username_Email: Username_Email,
            Password: Password,
            Manager: Manager,
            Speciality: Speciality,
            Position: Position,
            Roles_ID: Roles_ID
        }
        this.setState({User: tempUser});
    }

    handleUsernameEmailChange(event) {
        let {First_Name, Last_Name, Password, Manager, Speciality, Position, Roles_ID} = this.state.User;
        let tempUser = {
            First_Name: First_Name,
            Last_Name: Last_Name,
            Username_Email: event.target.value,
            Password: Password,
            Manager: Manager,
            Speciality: Speciality,
            Position: Position,
            Roles_ID: Roles_ID
        }
        this.setState({User: tempUser});
    }

    handlePasswordChange(event) {
        let {First_Name, Last_Name, Username_Email, Manager, Speciality, Position, Roles_ID} = this.state.User;
        let tempUser = {
            First_Name: First_Name,
            Last_Name: Last_Name,
            Username_Email: Username_Email,
            Password: event.target.value,
            Manager: Manager,
            Speciality: Speciality,
            Position: Position,
            Roles_ID: Roles_ID
        }
        this.setState({User: tempUser});
    }

    handleManagerChange(event) {
        let {First_Name, Last_Name, Username_Email, Password, Speciality, Position, Roles_ID} = this.state.User;
        if(event.target.validity.valid) {
            let tempUser = {
                First_Name: First_Name,
                Last_Name: Last_Name,
                Username_Email: Username_Email,
                Password: Password,
                Manager: event.target.value,
                Speciality: Speciality,
                Position: Position,
                Roles_ID: Roles_ID
            }
            this.setState({User: tempUser});
        }
    }

    handleSpecialityChange(event) {
        let {First_Name, Last_Name, Username_Email, Password, Manager, Position, Roles_ID} = this.state.User;
        let tempUser = {
            First_Name: First_Name,
            Last_Name: Last_Name,
            Username_Email: Username_Email,
            Password: Password,
            Manager: Manager,
            Speciality: event.target.value,
            Position: Position,
            Roles_ID: Roles_ID
        }
        this.setState({User: tempUser});
    }
    handlePositionChange(event) {
        let {First_Name, Last_Name, Username_Email, Password, Manager, Speciality, Roles_ID} = this.state.User;
        let tempUser = {
            First_Name: First_Name,
            Last_Name: Last_Name,
            Username_Email: Username_Email,
            Password: Password,
            Manager: Manager,
            Speciality: Speciality,
            Position: event.target.value,
            Roles_ID: Roles_ID
        }
        this.setState({User: tempUser});
    }
    handleRoleChange(event) {
        let {First_Name, Last_Name, Username_Email, Password, Manager, Speciality, Position} = this.state.User;
        if(event.target.validity.valid) {
            let tempUser = {
                First_Name: First_Name,
                Last_Name: Last_Name,
                Username_Email: Username_Email,
                Password:Password,
                Manager: Manager,
                Speciality: Speciality,
                Position: Position,
                Roles_ID: event.target.value
            }
            this.setState({User: tempUser});
        }
    }


}