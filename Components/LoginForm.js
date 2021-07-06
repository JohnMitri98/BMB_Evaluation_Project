import React from 'react';
const {Encrypt} = require('../Encryption/Encryptor');
const {Decrypt} = require('../Encryption/Decryptor');

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Username: "",
            Password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} class = "Login">
                <div style = {this.props.style} class = "Login">
                    <p>Login</p>
                    <div class = "Login">
                        {/*<label class = "Login">
                            Username:*/}
                            <input type = "text" value = {this.state.Username} onChange = {this.handleUsernameChange} class = "Login" />
                        {/*</label>*/}
                    </div>
                    <div class = "Login">
                        {/*<label class = "Login">
                            Password:*/}
                            <input type = "password" value = {this.state.Password} onChange = {this.handlePasswordChange} class = "Login" />
                        {/*</label>*/}
                    </div>
                    <input type = "submit" value = "Submit" onSubmit = {this.onSubmit} class = "Login" />
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
            //const response = await fetch(`/API/checkLogin/${Encrypt(this.state.Username)}-${Encrypt(this.state.Password)}`);
            let tempObj = {
                Username: Encrypt(this.state.Username),
                Password: Encrypt(this.state.Password)
            }
            const response = await fetch('/API/checkLogin', {
                method: 'SEARCH',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempObj)
            });
            if(response) {
                const body = await response.json();
                if(body) {
                    isCorrect = Decrypt(body.Correct);
                    tempName = Decrypt(body.Name);
                    tempUserID = Decrypt(body.UserID);
                    if(body.Roles){
                        tempRoles = body.Roles; 
                        for(const [key, value] of Object.entries(tempRoles)) {
                            tempRoles[key] = Decrypt(value);
                        }  
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