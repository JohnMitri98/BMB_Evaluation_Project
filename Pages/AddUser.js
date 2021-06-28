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
saveTables() {
 const { state, dispatch, tables } = this.props;
 this.state.tables.map((table) => {
  const data ={
    First_Name: users.First_Name,
    Last_Name: table.Last_Name,
    Username_Email: table.Username_Email,
    Password: users.Password,
    Manager: users.Manager,
    Speciality: users.Speciality,
    Position: users.Position,
    Roles_Id: users.Roles_Id
  }
  dispatch(Actions.save(this.props.tables.channel, data));
 })
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
       

                         <button onClick={this.saveTables}>Add </button>
                        <div> {addNew} </div>
                          </div>
                </div>

            </form>
        )
    }}
  