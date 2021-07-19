import React from 'react';
import {Redirect, Switch} from 'react-router-dom';
import SprintEvaluationsTable from '../Components/SprintEvaluationsTable';
import {Encrypt} from '../Encryption/Encryptor';
import {Decrypt} from '../Encryption/Decryptor';

export default class EvaluationsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Redirect: null,
            SprintEvaluations: [],
            Subordinates: [],
            Ready: "notYet"
        }
        this.goToEvaluations = this.goToEvaluations.bind(this);
        this.goToEvaluate = this.goToEvaluate.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
    }

    render() {
        return (
            <div style = {this.props.style} class = "tableDiv">
                {(this.state.Ready === "true") && <SprintEvaluationsTable SprintEvaluations = {this.state.SprintEvaluations} onEvaluationsButton = {[this.props.onEvaluationsButton, this.goToEvaluations]} refreshPage = {this.refreshPage} />}
                {(this.state.Ready === "false") && <h1>No Evaluations made yet</h1>}
                {(this.state.Ready === "notYet") && <h1>Loading</h1>}
                {((this.state.Subordinates[0] || (this.props.role.Evaluation_View + "" === true)) && <button onClick = {this.goToEvaluate} class = "addDetail">Evaluate</button>)}
                <Switch>
                    {this.state.Redirect}
                </Switch>
            </div>
        );
    }

    async componentDidMount() {
        if((this.props.loggedIn + "") === "false") {
            this.props.history[0]("/");
            this.props.history[0]("/UserView");
            await this.props.history[0]("/UserView/SprintEvaluations");
            this.setState({
                Redirect: <Redirect to = "/" />
            });
        }
        this.props.history[3]("/UserView/SprintEvaluations");
        let tempSprintEvaluations = [];
        let tempSubordinates = [];
        let tempObj = {
            UserID: Encrypt(this.props.ID),
            Admin: Encrypt(((this.props.role.Name === "Admin") || (this.props.role.Name === "Evaluator")) + "")
        };
        var response = await fetch(`/API/getSprintEvaluationsDone`, {
            method: 'SEARCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj)
        });
        if(response) {
            const body = await response.json();
            if(body.SprintEvaluations) {
                tempSprintEvaluations = body.SprintEvaluations;
                tempSprintEvaluations.forEach(sprintEvaluation => {
                    for(const [key, value] of Object.entries(sprintEvaluation)) {
                        sprintEvaluation[key] = Decrypt(value);
                    }
                });
            }
        }
        let tempObj2 = {
            ManagerID: Encrypt(this.props.ID),
            Admin: Encrypt(((this.props.role.Name === "Admin") || (this.props.role.Name === "Evaluator")) + "")
        };
        response = await fetch(`/API/getSubordinates`, {
            method: 'SEARCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj2)
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
        this.setState({
            SprintEvaluations: (tempSprintEvaluations[0] ? tempSprintEvaluations : []),
            Subordinates: (tempSubordinates[0] ? tempSubordinates : []),
            Ready: (tempSprintEvaluations[0] ? "true" : "false")
        });
    }

    goToEvaluations() {
        this.props.history[0]("/UserView/SprintEvaluations");
        this.setState({
            Redirect: <Redirect to = "/UserView/SprintEvaluations/Evaluations" />
        });
    }

    goToEvaluate() {
        this.props.history[0]("/UserView/SprintEvaluations");
        this.setState({
            Redirect: <Redirect to = "/UserView/SprintEvaluations/Evaluations/CreateEvaluation" />
        });
    }

    async refreshPage() {
        let tempEvaluations = [];
        let tempSubordinates = [];
        let tempSprint = {};
        let tempObj = {
            UserID: Encrypt(this.props.ID),
            Admin: Encrypt(((this.props.role.Name === "Admin") || (this.props.role.Name === "Evaluator")) + "")
        };
        var response = await fetch(`/API/getEvaluationsDone`, {
            method: 'SEARCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj)
        });
        if(response) {
            const body = await response.json();
            if(body.Evaluations) {
                tempEvaluations = body.Evaluations;
                tempEvaluations.forEach(evaluation => {
                    for(const [key, value] of Object.entries(evaluation)) {
                        evaluation[key] = Decrypt(value);
                    }
                    evaluation.showAll = false;
                });
            }
        }
        let tempObj2 = {
            ManagerID: Encrypt(this.props.ID),
            Admin: Encrypt(((this.props.role.Name === "Admin") || (this.props.role.Name === "Evaluator")) + "")
        };
        response = await fetch(`/API/getSubordinates`, {
            method: 'SEARCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj2)
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
        response = await fetch(`/API/getLastSprint`);
        if(response) {
            const body = await response.json();
            if(body.Start_Date) {
                tempSprint = Decrypt(body.Start_Date);
            }
        }
        this.setState({
            Evaluations: (tempEvaluations[0] ? tempEvaluations : []),
            Subordinates: (tempSubordinates[0] ? tempSubordinates : []),
            LastSprint: tempSprint,
            Ready: (tempEvaluations[0] ? "true" : "false")
        });
    }

}