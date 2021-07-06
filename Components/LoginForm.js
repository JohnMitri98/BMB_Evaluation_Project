import React from 'react';

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
        const container = { height: 1300 }
        return (
            <form>
            <form onSubmit={this.handleSubmit} class="Login"><div class="container">
                
                <div style = {this.props.style}>
                    <p>Login</p>
                    <div>
                        
                            <input type = "text" placeholder="Username" value = {this.state.Username} onChange = {this.handleUsernameChange} />
                       
                    </div>
                    <div>
                       
                           
                            <input type = "password"placeholder="Password" value = {this.state.Password} onChange = {this.handlePasswordChange}/>
                       
                    </div>
                    <input type="button" value="Sign in" onSubmit = {this.onSubmit}/>
                </div></div>
    
        
            </form >
            <div id="mySidenav" class="sidenav">
                
        <a href="#" id="Homes"><b>Home</b></a>
        <a href="#" id="Back"><b>Back</b></a>
        <a href="#" id="Evaluations"><b>Evaluations</b></a>
        <a href="#" id="MyEvaluations"><b>MyEvaluations</b></a>
        <a href="#" id="MyPerformance"><b>MyPerformance</b></a>
        <a href="#" id="Sprint"><b>Sprint</b></a>
        <a href="#" id="Users"><b>User</b></a>
        <a href="#" id="SignOut"><b>Sign Out</b></a>
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
            const response = await fetch(`/API/checkLogin/${this.state.Username}-${this.state.Password}`);
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
