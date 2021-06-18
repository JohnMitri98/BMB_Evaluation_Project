import React from 'react';
import {Redirect, Switch} from 'react-router';

export default class DetailsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        }
        this.goToDetails = this.goToDetails.bind(this);
    }

    render() {
        return (
            <div style = {this.props.style}>
                <button onClick = {this.props.history[1]}>
                    Back
                </button>
                <h1>This is the Details Page</h1>
                <button onClick = {this.goToDetails}>
                    Add Detail
                </button>
                <Switch>
                    {this.state.redirect}
                </Switch>
            </div>
        );
    }

    goToDetails() {
        this.props.history[0]("/UserView/Details");
        this.setState({
            redirect: <Redirect exact to = {`/UserView/Details/DetailsEdit`} />
        });
    }

    componentDidMount() {
        if((this.props.loggedIn + "") === "false") {
            this.props.history[0]("/");
            this.props.history[0]("/UserView");
            this.props.history[0]("/UserView/Details");
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
    }

}