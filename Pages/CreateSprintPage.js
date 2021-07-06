import React from 'react';
import {Switch, Redirect} from 'react-router-dom';
import SprintCreationForm from '../Components/SprintCreationForm';

export default class CreateSprintPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            Correct: "notYet"
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
                <SprintCreationForm style = {this.props.style} onSubmit = {this.handleSubmit} />
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
    }

}