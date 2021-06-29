import React from 'react';

export default class AddUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            First_Name: "",
            Last_Name: "",
            Username_Email:"",
            Password:"",
            Manager:"",
            Speciality:"",
            Position:"",
            Roles_Id:"",
        };
        this.handleFirst_Name = this.handleFirst_NameChange.bind(this);
        this.handleLast_NameChange = this.handleLast_NameChange.bind(this);
        this.handleUsername_EmailChange = this.handleUsername_EmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleManagerChange = this.handleManagerChange.bind(this);
        this.handleSpecialityChange = this.handleSpecialityChange.bind(this);
        this.handlePositionChange = this.handlePositionChange.bind(this);
        this.handleRoles_IdChange = this.handleRoles_IdChange.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div style = {this.props.style}>
                <div>
                        <label>
                           First Name
                            <input type = "text" value = {this.state.First_Name} onChange = {this.handleFirst_NameChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Last Name
                            <input type = "text" value = {this.state.Last_Name} onChange = {this.handleLast_NameChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Username_Email
                            <input type = "text" value = {this.state.Username_Email} onChange = {this.handleUsername_EmailChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password
                            <input type = "password" value = {this.state.Password} onChange = {this.handlePasswordChange}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Manager
                            <input type = "number" value = {this.state.Manager} onChange = {this.handleManagerChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Speciality
                            <input type = "text" value = {this.state.Speciality} onChange = {this.handleSpecialityChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Position
                            <input type = "text" value = {this.state.Position} onChange = {this.handlePositionChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Roles Id
                            <input type = "text" value = {this.state.Roles_Id} onChange = {this.handleRoles_IdChange} />
                        </label>
                    </div>
                    <div>
       

                         <button onClick={this.onSubmit}>Add </button>
                       
                          </div>
                </div>

            </form>
        )
    }
    async handleSubmit(e) {
        e.preventDefault();
        let {First_Name, Last_Name,Username_Email, Password, Manager, Speciality, Position, Roles_Id} = this.state.User;
        if(First_Name === "") {
            First_Name = "None";this.props.onSubmit(false);
        }
        if(Last_Name === "") {
            Last_Name = "None";this.props.onSubmit(false);
        }
        if(Username_Email === "") {
            Username_Email= "None";this.props.onSubmit(false);
        }
        if(Password === "") {
            Password= "None";this.props.onSubmit(false);
        } if(Manager === "") {
            Manager= "None";this.props.onSubmit(false);
        } if(Speciality=== "") {
            Speciality= "None";this.props.onSubmit(false);
        }
        if(Position === "") {
            Position= "None";this.props.onSubmit(false);
        } if(Roles_Id === "") {
            Roles_Id= "None";
        this.props.onSubmit(false);
        }
            
         else {
            let tempObj = {
                User: {
                    First_Name: First_Name,
                    Last_Name: Last_Name,
                    Username_Email: Username_Email,
                    Password: Password,
                    Manager: Manager,
                    Speciality: Speciality,
                    Position: Position,
                    Roles_Id: Roles_Id
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

    handleFirt_NameChange(event) {
        let {First_Name, Last_Name, Username_Email, Password, Manager, Speciality, Position, Roles_Id} = this.state.User;
        let tempUser = {
         First_Name: First_Name,
            Last_Name: Last_Name,
            Username_Email: Username_Email,
            Password:Password,
            Manager: Manager,
            Speciality:Speciality,
            Position: Position,
            Roles_Id: Roles_Id
        }
        this.setState({User: tempUser});
    }

    handleLast_NameChange(event) {
        let {First_Name, Last_Name, Username_Email, Password, Manager, Speciality, Position, Roles_Id} = this.state.User;
        let tempUser = {
         First_Name: First_Name,
            Last_Name: Last_Name,
            Username_Email: Username_Email,
            Password:Password,
            Manager: Manager,
            Speciality:Speciality,
            Position: Position,
            Roles_Id: Roles_Id
        }
        this.setState({User: tempUser});
    }

    handleUsername_EmailChange(event) {
        let {First_Name, Last_Name, Username_Email, Password, Manager, Speciality, Position, Roles_Id} = this.state.User;
        let tempUser = {
         First_Name: First_Name,
            Last_Name: Last_Name,
            Username_Email: Username_Email,
            Password:Password,
            Manager: Manager,
            Speciality:Speciality,
            Position: Position,
            Roles_Id: Roles_Id
        }
        this.setState({User: tempUser});
    }

    handlePasswordChange(event) {
        let {First_Name, Last_Name, Username_Email, Password, Manager, Speciality, Position, Roles_Id} = this.state.User;
        let tempUser = {
         First_Name: First_Name,
            Last_Name: Last_Name,
            Username_Email: Username_Email,
            Password:Password,
            Manager: Manager,
            Speciality:Speciality,
            Position: Position,
            Roles_Id: Roles_Id
        }
        this.setState({User: tempUser});
    }

    handleSpecialityChange(event) {
        let {First_Name, Last_Name, Username_Email, Password, Manager, Speciality, Position, Roles_Id} = this.state.User;
        let tempUser = {
         First_Name: First_Name,
            Last_Name: Last_Name,
            Username_Email: Username_Email,
            Password:Password,
            Manager: Manager,
            Speciality:Speciality,
            Position: Position,
            Roles_Id: Roles_Id
        }
        this.setState({User: tempUser});
    }
    handlePositionChange(event) {
        let {First_Name, Last_Name, Username_Email, Password, Manager, Speciality, Position, Roles_Id} = this.state.User;
        let tempUser = {
         First_Name: First_Name,
            Last_Name: Last_Name,
            Username_Email: Username_Email,
            Password:Password,
            Manager: Manager,
            Speciality:Speciality,
            Position: Position,
            Roles_Id: Roles_Id
        }
        this.setState({User: tempUser});
    }
    handleRoles_IdChange(event) {
        let {First_Name, Last_Name, Username_Email, Password, Manager, Speciality, Position, Roles_Id} = this.state.User;
        let tempUser = {
         First_Name: First_Name,
            Last_Name: Last_Name,
            Username_Email: Username_Email,
            Password:Password,
            Manager: Manager,
            Speciality:Speciality,
            Position: Position,
            Roles_Id: Roles_Id
        }
        this.setState({User: tempUser});
    }


}
  