import React from 'react';
import {Redirect} from 'react-router-dom';

export default class UserView extends React.Component {
    render() {
        if((this.props.loggedIn + "") === "false") {
            return (<Redirect to = "../" />);
        }
        return (
            <h1>This is the UserView!</h1>
        );
    }
}