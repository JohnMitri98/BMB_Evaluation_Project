import React from 'react';
import {Switch, Redirect} from 'react-router-dom';
import SprintCreationForm from '../Components/SprintCreationForm';
import {Decrypt} from '../Encryption/Decryptor';

export default class CreateSprintPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            Correct: "notYet",
            LastSprint: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        let warning = null;
        if((this.state.Correct + "") === "false") {
            warning = "Incorrect inputs, please try again";
        }
        return (
            <div style = {this.props.style}>
                <h1>This is the Sprint Creation Page</h1>
                {this.state.LastSprint ? 
                    <SprintCreationForm style = {this.props.style} lastSprint = {this.state.LastSprint} onSubmit = {this.handleSubmit} />
                    :
                    <h1>Loading</h1>
                }
                {warning && 
                    <h1>{warning}</h1>
                }
                <Switch>
                    {this.state.redirect}
                </Switch>
            </div>
        );
    }

    handleSubmit(valid) {
        if(valid) {
            this.setState({
                Correct: "true"
            });
            this.props.history[1]();
        } else {
            this.setState({
                Correct: "false"
            });
        }
    }

    async componentDidMount() {
        if((this.props.loggedIn + "") === "false") {
            this.props.history[0]("/");
            this.props.history[0]("/UserView");
            await this.props.history[0]("/UserView/Sprints");
            this.setState({
                redirect: <Redirect to = "/" />
            });
        }
        this.props.history[3]("/UserView/Sprints/CreateSprint");
        let tempSprint = {};
        const response = await fetch('/API/getLastSprint');
        if(response) {
            const body = await response.json();
            if(body.Start_Date && body.End_Date) {
                tempSprint = {
                    startDate: Decrypt(body.Start_Date),
                    endDate: Decrypt(body.End_Date)
                };
            }
        }
        this.setState({
            LastSprint: tempSprint
        });
    }

}