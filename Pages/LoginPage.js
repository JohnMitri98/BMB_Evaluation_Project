import React from 'react';
import Login from '../Components/Login.js';

export default class LoginPage extends React.Component {

    render() {
        return(
            <div style = {this.props.style}>
                <h1>Login</h1>
                <Login style = {this.props.style} onSubmit = {this.props.onSubmit}/>
            </div>
        );
    }

}