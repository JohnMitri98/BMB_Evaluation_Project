import React from 'react';
import {Encrypt} from '../Encryption/Encryptor';
import {Decrypt} from '../Encryption/Decryptor';

let ss = 1;
let sa = 2;
let st = 0.2;

export default class EvaluationCreationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Evaluation: {
                EvaluatorID: this.props.EvaluatorID,
                EvaluatedID: this.props.Subordinates[0].ID,
                SprintID: this.props.Sprints[0].ID,
                Nb_Features_Taken: "",
                Nb_Features_Completed: "",
                Nb_Bugs_Taken: "",
                Nb_Bugs_Completed: "",
                Nb_PR: "",
                Nb_PRR: "",
                Nb_PRS: "",
                Nb_PRA: ""
            },
            formClass: "Evaluation"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEvaluatedChange = this.handleEvaluatedChange.bind(this);
        this.handleSprintChange = this.handleSprintChange.bind(this);
        this.handleFTChange = this.handleFTChange.bind(this);
        this.handleFCChange = this.handleFCChange.bind(this);
        this.handleBTChange = this.handleBTChange.bind(this);
        this.handleBCChange = this.handleBCChange.bind(this);
        this.handlePRChange = this.handlePRChange.bind(this);
        this.handlePRRChange = this.handlePRRChange.bind(this);
        this.handlePRSChange = this.handlePRSChange.bind(this);
        this.handlePRAChange = this.handlePRAChange.bind(this);
    }
    
    render() {
        let {Nb_Features_Taken, Nb_Features_Completed, Nb_Bugs_Taken, Nb_Bugs_Completed, Nb_PR, Nb_PRR, Nb_PRS, Nb_PRA} = this.state.Evaluation;
        return (
            <form onSubmit={this.handleSubmit} class = "Evaluation">
                <div style = {this.props.style}>
                    <label>
                        Evaluatee: 
                        <select onChange = {this.handleEvaluatedChange} class = "date">
                            {this.props.Subordinates.map(subordinate => <option value = {subordinate.ID}>{subordinate.First_Name + " " + subordinate.Last_Name}</option>)}
                        </select>
                    </label>
                    <label>
                        Sprint: 
                        <select onChange = {this.handleSprintChange} class = "date">
                            {this.props.Sprints.map(sprint => <option value = {sprint.ID}>{(new Date(sprint.Start_Date)).toDateString() + " => " + (new Date(sprint.End_Date)).toDateString()}</option>)}
                        </select>
                    </label>
                    <label>
                        # Features Taken:* 
                        <input type = "text" pattern = "[0-9]*" value = {Nb_Features_Taken} onChange = {this.handleFTChange}/>
                    </label>
                    <label>
                        # Features Completed:* 
                        <input type = "text" pattern = "[0-9]*" value = {Nb_Features_Completed} onChange = {this.handleFCChange}/>
                    </label>
                    <label>
                        # Bugs Taken:* 
                        <input type = "text" pattern = "[0-9]*" value = {Nb_Bugs_Taken} onChange = {this.handleBTChange}/>
                    </label>
                    <label>
                        # Bugs Completed:* 
                        <input type = "text" pattern = "[0-9]*" value = {Nb_Bugs_Completed} onChange = {this.handleBCChange}/>
                    </label>
                    <label>
                        # Pull Requests:* 
                        <input type = "text" pattern = "[0-9]*" value = {Nb_PR} onChange = {this.handlePRChange}/>
                    </label>
                    <label>
                        # Pull Requests Rejected:* 
                        <input type = "text" pattern = "[0-9]*" value = {Nb_PRR} onChange = {this.handlePRRChange}/>
                    </label>
                    <label>
                        # Pull Requests Severe:* 
                        <input type = "text" pattern = "[0-9]*" value = {Nb_PRS} onChange = {this.handlePRSChange}/>
                    </label>
                    <label>
                        # Pull Requests Abandoned:* 
                        <input type = "text" pattern = "[0-9]*" value = {Nb_PRA} onChange = {this.handlePRAChange}/>
                    </label>
                    <input type = "submit" value = "Submit" onSubmit = {this.onSubmit}/>
                </div>
            </form>
        )
    }

    async handleSubmit(e) {
        e.preventDefault();
        let {EvaluatorID, EvaluatedID, SprintID, Nb_Features_Taken, Nb_Features_Completed, Nb_Bugs_Taken, Nb_Bugs_Completed, Nb_PR, Nb_PRR, Nb_PRS, Nb_PRA} = this.state.Evaluation;
        if(Nb_Features_Taken === "" || Nb_Features_Completed === "" || Nb_Bugs_Taken === "" || Nb_Bugs_Completed === "" || Nb_PR === "" || Nb_PRR === "" || Nb_PRS === "" || Nb_PRA === "") {
            this.setState({
                Evaluation: {
                    EvaluatorID: this.props.EvaluatorID,
                    EvaluatedID: this.props.Subordinates[0].ID,
                    SprintID: this.props.Sprints[0].ID,
                    Nb_Features_Taken: "",
                    Nb_Features_Completed: "",
                    Nb_Bugs_Taken: "",
                    Nb_Bugs_Completed: "",
                    Nb_PR: "",
                    Nb_PRR: "",
                    Nb_PRS: "",
                    Nb_PRA: ""
                }
            });
            this.props.onSubmit(false);
        } else {
            let tempGrade = this.calculateGrade(this.state.Evaluation);
            let tempObj = {
                Evaluation: {
                    EvaluatorID: Encrypt(EvaluatorID),
                    EvaluatedID: Encrypt(EvaluatedID),
                    SprintID: Encrypt(SprintID),
                    Nb_Features_Taken: Encrypt(Nb_Features_Taken),
                    Nb_Features_Completed: Encrypt(Nb_Features_Completed),
                    Nb_Bugs_Taken: Encrypt(Nb_Bugs_Taken),
                    Nb_Bugs_Completed: Encrypt(Nb_Bugs_Completed),
                    Nb_PR: Encrypt(Nb_PR),
                    Nb_PRR: Encrypt(Nb_PRR),
                    Nb_PRS: Encrypt(Nb_PRS),
                    Nb_PRA: Encrypt(Nb_PRA),
                    Grade: Encrypt(tempGrade)
                }
            };
            const response = await fetch('/API/insertEvaluation', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempObj)
            });
            if(response) {
                const body = await response.json();
                if(body.Success) {
                    this.props.onSubmit(Decrypt(body.Success) === "Done");
                } else this.props.onSubmit(false);
            } else this.props.onSubmit(false);
        }
    };
    
    calculateGrade(Evaluation) {
        return ((Evaluation.Nb_PRR / Evaluation.Nb_PR * 100) + (Evaluation.Nb_PRS * ss) + (Evaluation.Nb_PRA * sa) - (Evaluation.Nb_PR * st));
    }

    handleEvaluatedChange(event) {
        let {EvaluatorID, SprintID, Nb_Features_Taken, Nb_Features_Completed, Nb_Bugs_Taken, Nb_Bugs_Completed, Nb_PR, Nb_PRR, Nb_PRS, Nb_PRA} = this.state.Evaluation;
        let tempEvaluation = {
            EvaluatorID: EvaluatorID,
            EvaluatedID: event.target.value,
            SprintID: SprintID,
            Nb_Features_Taken: Nb_Features_Taken,
            Nb_Features_Completed: Nb_Features_Completed,
            Nb_Bugs_Taken: Nb_Bugs_Taken,
            Nb_Bugs_Completed: Nb_Bugs_Completed,
            Nb_PR: Nb_PR,
            Nb_PRR: Nb_PRR,
            Nb_PRS: Nb_PRS,
            Nb_PRA: Nb_PRA
        };
        this.setState({
            Evaluation: tempEvaluation,
        });
    }

    handleSprintChange(event) {
        let {EvaluatorID, EvaluatedID, Nb_Features_Taken, Nb_Features_Completed, Nb_Bugs_Taken, Nb_Bugs_Completed, Nb_PR, Nb_PRR, Nb_PRS, Nb_PRA} = this.state.Evaluation;
        let tempEvaluation = {
            EvaluatorID: EvaluatorID,
            EvaluatedID: EvaluatedID,
            SprintID: event.target.value,
            Nb_Features_Taken: Nb_Features_Taken,
            Nb_Features_Completed: Nb_Features_Completed,
            Nb_Bugs_Taken: Nb_Bugs_Taken,
            Nb_Bugs_Completed: Nb_Bugs_Completed,
            Nb_PR: Nb_PR,
            Nb_PRR: Nb_PRR,
            Nb_PRS: Nb_PRS,
            Nb_PRA: Nb_PRA
        };
        this.setState({Evaluation: tempEvaluation});
    }

    handleFTChange(event) {
        let {EvaluatorID, EvaluatedID, SprintID, Nb_Features_Completed, Nb_Bugs_Taken, Nb_Bugs_Completed, Nb_PR, Nb_PRR, Nb_PRS, Nb_PRA} = this.state.Evaluation;
        if(event.target.validity.valid) {
            let tempEvaluation = {
                EvaluatorID: EvaluatorID,
                EvaluatedID: EvaluatedID,
                SprintID: SprintID,
                Nb_Features_Taken: event.target.value,
                Nb_Features_Completed: Nb_Features_Completed,
                Nb_Bugs_Taken: Nb_Bugs_Taken,
                Nb_Bugs_Completed: Nb_Bugs_Completed,
                Nb_PR: Nb_PR,
                Nb_PRR: Nb_PRR,
                Nb_PRS: Nb_PRS,
                Nb_PRA: Nb_PRA
            };
            this.setState({Evaluation: tempEvaluation});
        }
    }

    handleFCChange(event) {
        let {EvaluatorID, EvaluatedID, SprintID, Nb_Features_Taken, Nb_Bugs_Taken, Nb_Bugs_Completed, Nb_PR, Nb_PRR, Nb_PRS, Nb_PRA} = this.state.Evaluation;
        if(event.target.validity.valid) {
            let tempEvaluation = {
                EvaluatorID: EvaluatorID,
                EvaluatedID: EvaluatedID,
                SprintID: SprintID,
                Nb_Features_Taken: Nb_Features_Taken,
                Nb_Features_Completed: event.target.value,
                Nb_Bugs_Taken: Nb_Bugs_Taken,
                Nb_Bugs_Completed: Nb_Bugs_Completed,
                Nb_PR: Nb_PR,
                Nb_PRR: Nb_PRR,
                Nb_PRS: Nb_PRS,
                Nb_PRA: Nb_PRA
            };
            this.setState({Evaluation: tempEvaluation});
        }
    }

    handleBTChange(event) {
        let {EvaluatorID, EvaluatedID, SprintID, Nb_Features_Taken, Nb_Features_Completed, Nb_Bugs_Completed, Nb_PR, Nb_PRR, Nb_PRS, Nb_PRA} = this.state.Evaluation;
        if(event.target.validity.valid) {
            let tempEvaluation = {
                EvaluatorID: EvaluatorID,
                EvaluatedID: EvaluatedID,
                SprintID: SprintID,
                Nb_Features_Taken: Nb_Features_Taken,
                Nb_Features_Completed: Nb_Features_Completed,
                Nb_Bugs_Taken: event.target.value,
                Nb_Bugs_Completed: Nb_Bugs_Completed,
                Nb_PR: Nb_PR,
                Nb_PRR: Nb_PRR,
                Nb_PRS: Nb_PRS,
                Nb_PRA: Nb_PRA
            };
            this.setState({Evaluation: tempEvaluation});
        }
    }

    handleBCChange(event) {
        let {EvaluatorID, EvaluatedID, SprintID, Nb_Features_Taken, Nb_Features_Completed, Nb_Bugs_Taken, Nb_PR, Nb_PRR, Nb_PRS, Nb_PRA} = this.state.Evaluation;
        if(event.target.validity.valid) {
            let tempEvaluation = {
                EvaluatorID: EvaluatorID,
                EvaluatedID: EvaluatedID,
                SprintID: SprintID,
                Nb_Features_Taken: Nb_Features_Taken,
                Nb_Features_Completed: Nb_Features_Completed,
                Nb_Bugs_Taken: Nb_Bugs_Taken,
                Nb_Bugs_Completed: event.target.value,
                Nb_PR: Nb_PR,
                Nb_PRR: Nb_PRR,
                Nb_PRS: Nb_PRS,
                Nb_PRA: Nb_PRA
            };
            this.setState({Evaluation: tempEvaluation});
        }
    }

    handlePRChange(event) {
        let {EvaluatorID, EvaluatedID, SprintID, Nb_Features_Taken, Nb_Features_Completed, Nb_Bugs_Taken, Nb_Bugs_Completed, Nb_PRR, Nb_PRS, Nb_PRA} = this.state.Evaluation;
        if(event.target.validity.valid) {
            let tempEvaluation = {
                EvaluatorID: EvaluatorID,
                EvaluatedID: EvaluatedID,
                SprintID: SprintID,
                Nb_Features_Taken: Nb_Features_Taken,
                Nb_Features_Completed: Nb_Features_Completed,
                Nb_Bugs_Taken: Nb_Bugs_Taken,
                Nb_Bugs_Completed: Nb_Bugs_Completed,
                Nb_PR: event.target.value,
                Nb_PRR: Nb_PRR,
                Nb_PRS: Nb_PRS,
                Nb_PRA: Nb_PRA
            };
            this.setState({Evaluation: tempEvaluation});
        }
    }

    handlePRRChange(event) {
        let {EvaluatorID, EvaluatedID, SprintID, Nb_Features_Taken, Nb_Features_Completed, Nb_Bugs_Taken, Nb_Bugs_Completed, Nb_PR, Nb_PRS, Nb_PRA} = this.state.Evaluation;
        if(event.target.validity.valid) {
            let tempEvaluation = {
                EvaluatorID: EvaluatorID,
                EvaluatedID: EvaluatedID,
                SprintID: SprintID,
                Nb_Features_Taken: Nb_Features_Taken,
                Nb_Features_Completed: Nb_Features_Completed,
                Nb_Bugs_Taken: Nb_Bugs_Taken,
                Nb_Bugs_Completed: Nb_Bugs_Completed,
                Nb_PR: Nb_PR,
                Nb_PRR: event.target.value,
                Nb_PRS: Nb_PRS,
                Nb_PRA: Nb_PRA
            };
            this.setState({Evaluation: tempEvaluation});
        }
    }

    handlePRSChange(event) {
        let {EvaluatorID, EvaluatedID, SprintID, Nb_Features_Taken, Nb_Features_Completed, Nb_Bugs_Taken, Nb_Bugs_Completed, Nb_PR, Nb_PRR, Nb_PRA} = this.state.Evaluation;
        if(event.target.validity.valid) {
            let tempEvaluation = {
                EvaluatorID: EvaluatorID,
                EvaluatedID: EvaluatedID,
                SprintID: SprintID,
                Nb_Features_Taken: Nb_Features_Taken,
                Nb_Features_Completed: Nb_Features_Completed,
                Nb_Bugs_Taken: Nb_Bugs_Taken,
                Nb_Bugs_Completed: Nb_Bugs_Completed,
                Nb_PR: Nb_PR,
                Nb_PRR: Nb_PRR,
                Nb_PRS: event.target.value,
                Nb_PRA: Nb_PRA
            };
            this.setState({Evaluation: tempEvaluation});
        }
    }

    handlePRAChange(event) {
        let {EvaluatorID, EvaluatedID, SprintID, Nb_Features_Taken, Nb_Features_Completed, Nb_Bugs_Taken, Nb_Bugs_Completed, Nb_PR, Nb_PRR, Nb_PRS} = this.state.Evaluation;
        if(event.target.validity.valid) {
            let tempEvaluation = {
                EvaluatorID: EvaluatorID,
                EvaluatedID: EvaluatedID,
                SprintID: SprintID,
                Nb_Features_Taken: Nb_Features_Taken,
                Nb_Features_Completed: Nb_Features_Completed,
                Nb_Bugs_Taken: Nb_Bugs_Taken,
                Nb_Bugs_Completed: Nb_Bugs_Completed,
                Nb_PR: Nb_PR,
                Nb_PRR: Nb_PRR,
                Nb_PRS: Nb_PRS,
                Nb_PRA: event.target.value
            };
            this.setState({Evaluation: tempEvaluation});
        }
    }

}