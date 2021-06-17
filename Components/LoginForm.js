import React from 'react';

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Username: "",
            Password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div style = {this.props.style}>
                    <div>
                        <label>
                            Username
                            <input type = "text" value = {this.state.Username} onChange = {this.handleUsernameChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password
                            <input type = "password" value = {this.state.Password} onChange = {this.handlePasswordChange}/>
                        </label>
                    </div>
                    <input type = "submit" value = "Submit" onSubmit = {this.onSubmit}/>
                </div>
            </form>
        )
    }

    async handleSubmit(e) {
        e.preventDefault();
        let isCorrect = false;
        let tempName = "";
        let tempRoles = null;
        let tempUserID = 0;
        if(this.state.Username !== "" && this.state.Password !== "") {
            const response = await fetch(`/API/checkLogin-${this.state.Username}-${this.state.Password}`);
            if(response) {
                const body = await response.json();
                if(body) {
                    isCorrect = body.Correct;
                    tempName = body.Name;
                    tempUserID = body.UserID;
                    if(body.Roles){
                        tempRoles = body.Roles;   
                    }
                }
            }
        }
        if((isCorrect + "") !== "true") {
            this.setState({
                Username: "",
                Password: ""
            });
        }
        this.props.onSubmit(isCorrect, tempName, tempRoles, tempUserID);
    }

    handleUsernameChange(event) {
        this.setState({Username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({Password: event.target.value});
    }

}