import React from 'react';
import LoginForm from '../Components/LoginForm';

export default class LoginPage extends React.Component {

    render() {
        return(
            <div style = {{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <h1>Hello</h1>
                <LoginForm onSubmit = {this.props.onSubmit}/>
                <h1>Yo {this.props.correct + ""}</h1>
            </div>
        );
    }

}