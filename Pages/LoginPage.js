import React from 'react';
import LoginForm from '../Components/LoginForm';

export default class LoginPage extends React.Component {

    render() {
        return(
            <div style = {{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <h1>Login</h1>
                <LoginForm onSubmit = {this.props.onSubmit}/>
            </div>
        );
    }

}