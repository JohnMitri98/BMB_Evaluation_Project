import React from 'react';
import LoginForm from '../Components/LoginForm';

export default class LoginPage extends React.Component {

    render() {
        return(
            <div style = {this.props.style}>
                <h1>Login</h1>
                <LoginForm style = {this.props.style} onSubmit = {this.props.onSubmit}/>
            </div>
        );
    }

}