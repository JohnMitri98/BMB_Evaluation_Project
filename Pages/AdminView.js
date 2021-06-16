import React from 'react';
import {Redirect, Switch} from 'react-router-dom';

export default class AdminView extends React.Component {
    render() {
        if((this.props.loggedIn + "") === "false") {
            return (<Redirect to = "/" />);
        }
        return (
            <h1>This is the AdminView!</h1>
        );
    }
}