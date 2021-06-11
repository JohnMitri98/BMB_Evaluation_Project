import React ,{ Component } from 'react';

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
        }
    }  
    handleUsernameChange= (event)=> {
        this.setState({
            username:event.target.value
        })

    }
    handlePasswordChange= (event)=> {
        this.setState({
            password:event.target.value
        })

    }

    render(){
        return(
        <form>
            <div><center>
            <h1>Please Log In</h1>
                <label> <p>Username
                <input type = 'text' value={this.state.username}onChange={this.handleUsernameChange}/></p></label>
                <label> <p>Password
                <input type = 'password' value={this.state.password}onChange={this.handlePasswordChange}/></p></label>
                <button type="submit"> Login
                </button>
           </center> </div>
        </form>
        )}
}
export default Login 