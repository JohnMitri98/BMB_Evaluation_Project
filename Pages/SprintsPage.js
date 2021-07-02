import React from 'react';
import {Redirect, Switch} from 'react-router-dom';
import SprintsTable from '../Components/SprintsTable'
import {Decrypt} from '../Encryption/Decryptor';

export default class SprintsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            Sprints: [],
            ready: "notYet"
        }
        this.goToSprint = this.goToSprint.bind(this);
    }

    render() {
        return (
            <div style = {this.props.style}>
                {(this.state.ready === "true") && <SprintsTable Sprints = {this.state.Sprints} />}
                {(this.state.ready === "false") && <h1>No Sprints yet</h1>}
                {(this.state.ready === "notYet") && <h1>Loading</h1>}
                <button onClick = {this.goToSprint} class = "addDetail">
                    Create Sprint
                </button>
                <Switch>
                    {this.state.redirect}
                </Switch>
            </div>
        );
    }

    async componentDidMount() {
        if((this.props.loggedIn + "") === "false") {
            this.props.history[0]("/");
            this.props.history[0]("/UserView");
            this.props.history[0]("/UserView/Sprints");
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
        this.props.history[3]("/UserView/Sprints");
        let tempSprints = [];
        const response = await fetch(`/API/getSprints`);
        if(response) {
            const body = await response.json();
            if(body.Sprints) {
                tempSprints = body.Sprints;
                tempSprints.forEach(sprint => {
                    for(const [key, value] of Object.entries(sprint)) {
                        sprint[key] = Decrypt(value);
                    }
                });
            }
        }
        this.setState({
            Sprints: (tempSprints[0] ? tempSprints : []),
            ready: (tempSprints[0] ? "true" : "false")
        });
    }

    goToSprint() {
        this.props.history[0]("/UserView/Sprints");
        this.setState({
            redirect: <Redirect to = "/UserView/Sprints/CreateSprint" />
        });
    }

}