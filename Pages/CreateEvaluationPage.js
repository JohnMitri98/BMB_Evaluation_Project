import React from 'react';
import {Switch, Redirect} from 'react-router-dom';
import EvaluationCreationForm from '../Components/EvaluationCreationForm';
import {Encrypt} from '../Encryption/Encryptor';
import {Decrypt} from '../Encryption/Decryptor';

export default class CreateEvaluationPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Redirect: null,
            Correct: "notYet",
            Subordinates: [],
            Sprints: [],
            Ready: "false"
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
                {(this.state.Ready === "true") && <EvaluationCreationForm style = {this.props.style} onSubmit = {this.handleSubmit} EvaluatorID = {this.props.EvaluatorID} Subordinates = {this.state.Subordinates} Sprints = {this.state.Sprints} />}
                {(this.state.Ready === "false") && <h1>Loading</h1>}
                {warning && 
                    <h1>{warning}</h1>
                }
                <Switch>
                    {this.state.Redirect}
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
            this.props.history[0]("/UserView/SprintEvaluations");
            this.props.history[0]("/UserView/SprintEvaluations/Evaluations");
            await this.props.history[0]("/UserView/SprintEvaluations/Evaluations/CreateEvaluation");
            this.setState({
                Redirect: <Redirect to = "/" />
            });
        }
        this.props.history[3]("/UserView/SprintEvaluations/Evaluations/CreateEvaluation");
        let tempSubordinates = [];
        let tempSprints = [];
        let tempObj = {
            ManagerID: Encrypt(this.props.EvaluatorID),
            Admin: Encrypt(((this.props.role === "Admin") || (this.props.role === "Evaluator")) + "")
        };
        var response = await fetch(`/API/getSubordinates`, {
            method: 'SEARCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj)
        });
        if(response) {
            const body = await response.json();
            if(body.Subordinates) {
                tempSubordinates = body.Subordinates;
                tempSubordinates.forEach(subordinate => {
                    for(const [key, value] of Object.entries(subordinate)) {
                        subordinate[key] = Decrypt(value);
                    }
                });
            }
        }
        response = await fetch(`/API/getSprints`);
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
            Subordinates: tempSubordinates,
            Sprints: tempSprints,
            Ready: "true"
        });
    }

}
