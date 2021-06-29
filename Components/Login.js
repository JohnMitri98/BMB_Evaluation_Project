import React from 'react';
import "../App.css";

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
         
      
        
     
              
                
                    <div><center><h5 color="white" style={{ marginBottom: 0 }}>
                        
                           <h1> Welcome</h1>
                        </h5></center> </div>
                    <div><center>
                        <label> 
                       Username
                            <input type = "text" value = {this.state.Username} color="lightBlue" placeholder="Enter your username"
                                iconName="username"onChange = {this.handleUsernameChange}/>
                        </label></center>
                    </div>
                    <div>
                      <center> <label>
                            Password
                            <input type = "password"   
                                placeholder=" Enter your password"
                                iconName="lock"value = {this.state.Password} onChange = {this.handlePasswordChange}/>
                        </label></center> 
                    </div> <center>
                    <input type = "submit" value = "Login"  onSubmit = {this.onSubmit}/></center>
                    <div class="topnav" id="myTopnav">
  <a href="#home" class="active">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a></div>
            </form>
            
        )
    }

    async handleSubmit(e) {
        e.preventDefault();
        let isCorrect = false;
        let tempName = "";
        let tempRoles = null;
        if(this.state.Username !== "" && this.state.Password !== "") {
            const response = await fetch(`/API/checkLogin-${this.state.Username}-${this.state.Password}`);
            if(response) {
                const body = await response.json();
                if(body) {
                    isCorrect = body.Correct;
                    tempName = body.Name;
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
        this.props.onSubmit(isCorrect, tempName, tempRoles);
    }

    handleUsernameChange(event) {
        this.setState({Username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({Password: event.target.value});
    }

}
