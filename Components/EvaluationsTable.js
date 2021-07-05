import React from 'react';
import {Link} from 'react-router-dom';
import {Encrypt} from '../Encryption/Encryptor';
var _ = require('lodash');

let ss = 1;
let sa = 2;
let st = 0.2;

export default class EvaluationsTable extends React.Component {

    constructor(props) {
        super(props);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
        this.calculateGrade = this.calculateGrade.bind(this);
        this.incrementDB = this.incrementDB.bind(this);
        this.handleInc = this.handleInc.bind(this);
        this.handleIncG = this.handleIncG.bind(this);
        this.decrementDB = this.decrementDB.bind(this);
        this.handleDec = this.handleDec.bind(this);
        this.handleDecG = this.handleDecG.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
        this.state = {
            redirect: null,
            Evaluations: this.props.Evaluations
        };
    }

    render() {
        return(
            <div>
            {/*<div class = "table-wrapper">*/}
                <table>
                {/*<table class = "fl-table">*/}
                    <tbody>
                        {this.renderTableHeader()}
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        );
    }

    renderTableHeader() {
        return (
            <tr>
                <th>Evaluated</th>
                <th>Sprint Start Date</th>
                <th>Features Taken</th>
                <th>Features Completed</th>
                <th>Bugs Taken</th>
                <th>Bugs Completed</th>
                <th>Pull Requests</th>
                <th>Pull Requests Rejected</th>
                <th>Pull Requests Severe</th>
                <th>Pull Requests Abandoned</th>
                <th>Grade</th>
                <th>Details</th>
            </tr>
        );
    }

    renderTableData() {
        return this.state.Evaluations.map((Evaluation, index) => {
            const {ID,
                First_Name,
                Last_Name,
                Nb_Features_Taken,
                Nb_Features_Completed,
                Nb_Bugs_Taken,
                Nb_Bugs_Completed,
                Nb_PR,
                Nb_PR_Rejected,
                Nb_PR_Severe,
                Nb_PR_Abandoned,
                Grade,
                Start_Date
            } = Evaluation;
            return (
                <tr key = {index}>
                    <td id = "Name" style = {{fontWeight: "bold"}}>
                        {First_Name + " " + Last_Name}
                    </td>
                    <td>
                        {new Date(Start_Date).toDateString()}
                    </td>
                    <td>
                        {/*{Nb_Features_Taken}
                        <Link onClick={() => this.handleInc(Evaluation, "Nb_Features_Taken")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                        <Link onClick={() => this.handleDec(Evaluation, "Nb_Features_Taken")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            -
                        </Link>*/}
                        <input type = "text" pattern = "[0-9]*" value = {Nb_Features_Taken} onChange = {(event) => this.handleDataChange(Evaluation, "Nb_Features_Taken", event)} onBlur = {() => this.submitUpdate(Evaluation, "Nb_Features_Taken")} class = "tableInput" />
                    </td>
                    <td>
                        {/*{Nb_Features_Completed}
                        <Link onClick={() => this.handleInc(Evaluation, "Nb_Features_Completed")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                        <Link onClick={() => this.handleDec(Evaluation, "Nb_Features_Completed")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            -
                        </Link>*/}
                        <input type = "text" pattern = "[0-9]*" value = {Nb_Features_Completed} onChange = {(event) => this.handleDataChange(Evaluation, "Nb_Features_Completed", event)} onBlur = {() => this.submitUpdate(Evaluation, "Nb_Features_Completed")} class = "tableInput" />
                    </td>
                    <td>
                        {/*{Nb_Bugs_Taken}
                        <Link onClick={() => this.handleInc(Evaluation, "Nb_Bugs_Taken")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                        <Link onClick={() => this.handleDec(Evaluation, "Nb_Bugs_Taken")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            -
                        </Link>*/}
                        <input type = "text" pattern = "[0-9]*" value = {Nb_Bugs_Taken} onChange = {(event) => this.handleDataChange(Evaluation, "Nb_Bugs_Taken", event)} onBlur = {() => this.submitUpdate(Evaluation, "Nb_Bugs_Taken")} class = "tableInput" />
                    </td>
                    <td>
                        {/*{Nb_Bugs_Completed}
                        <Link onClick={() => this.handleInc(Evaluation, "Nb_Bugs_Completed")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                        <Link onClick={() => this.handleDec(Evaluation, "Nb_Bugs_Completed")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            -
                        </Link>*/}
                        <input type = "text" pattern = "[0-9]*" value = {Nb_Bugs_Completed} onChange = {(event) => this.handleDataChange(Evaluation, "Nb_Bugs_Completed", event)} onBlur = {() => this.submitUpdate(Evaluation, "Nb_Bugs_Completed")} class = "tableInput" />
                    </td>
                    <td>
                        {/*{Nb_PR}
                        <Link onClick={() => this.handleIncG(Evaluation, "Nb_PR")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                        <Link onClick={() => this.handleDecG(Evaluation, "Nb_PR")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            -
                        </Link>*/}
                        <input type = "text" pattern = "[0-9]*" value = {Nb_PR} onChange = {(event) => this.handleDataChange(Evaluation, "Nb_PR", event)} onBlur = {() => this.submitUpdate(Evaluation, "Nb_PR")} class = "tableInput" />
                    </td>
                    <td>
                        {/*{Nb_PR_Rejected}
                        <Link onClick={() => this.handleIncG(Evaluation, "Nb_PR_Rejected")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                        <Link onClick={() => this.handleDecG(Evaluation, "Nb_PR_Rejected")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            -
                        </Link>*/}
                        <input type = "text" pattern = "[0-9]*" value = {Nb_PR_Rejected} onChange = {(event) => this.handleDataChange(Evaluation, "Nb_PR_Rejected", event)} onBlur = {() => this.submitUpdate(Evaluation, "Nb_PR_Rejected")} class = "tableInput" />
                    </td>
                    <td>
                        {/*{Nb_PR_Severe}
                        <Link onClick={() => this.handleIncG(Evaluation, "Nb_PR_Severe")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                        <Link onClick={() => this.handleDecG(Evaluation, "Nb_PR_Severe")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            -
                        </Link>*/}
                        <input type = "text" pattern = "[0-9]*" value = {Nb_PR_Severe} onChange = {(event) => this.handleDataChange(Evaluation, "Nb_PR_Severe", event)} onBlur = {() => this.submitUpdate(Evaluation, "Nb_PR_Severe")} class = "tableInput" />
                    </td>
                    <td>
                        {/*{Nb_PR_Abandoned}
                        <Link onClick={() => this.handleIncG(Evaluation, "Nb_PR_Abandoned")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                        <Link onClick={() => this.handleDecG(Evaluation, "Nb_PR_Abandoned")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            -
                        </Link>*/}
                        <input type = "text" pattern = "[0-9]*" value = {Nb_PR_Abandoned} onChange = {(event) => this.handleDataChange(Evaluation, "Nb_PR_Abandoned", event)} onBlur = {() => this.submitUpdate(Evaluation, "Nb_PR_Abandoned")} class = "tableInput" />
                    </td>
                    <td>
                        {parseFloat(Grade).toFixed(2)}
                    </td>
                    <td>
                        <button onClick = {() => this.handleDetails(ID)} class = 'signOut'>
                            <div class = "extraWidth">
                                Details
                            </div>
                        </button>
                    </td>
                </tr>
            );
        });
    }

    async handleDetails(ID) {
        await this.props.onDetailsButton[0](ID);
        await this.props.onDetailsButton[1]();
    }

    calculateGrade(Evaluation) {
        Evaluation["Grade"] = ((Evaluation.Nb_PR_Rejected / Evaluation.Nb_PR * 100) + (Evaluation.Nb_PR_Severe * ss) + (Evaluation.Nb_PR_Abandoned * sa) - (Evaluation.Nb_PR * st)).toFixed(2);
        return Evaluation["Grade"];
    }

    async handleDataChange(Evaluation, Field, event) {
        if(event.target.validity.valid) {
            Evaluation[Field] = event.target.value;
            this.setState({});
        }
    }

    async submitUpdate(Evaluation, Field) {
        let tempGrade = this.calculateGrade(Evaluation);
        this.setState({});
        let tempObj = {
            Change: Encrypt(Evaluation[Field]),
            Grade: Encrypt(tempGrade),
            Field: Encrypt(Field),
            EvaluationID: Encrypt(Evaluation["ID"])
        };
        await fetch(`/API/updateEvaluation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj)
        });
    }
    
    async incrementDB(ID, Field, Grade, Decimal) {
        this.setState({});
        this.props.refreshPage();
        let tempObj = {
            EvaluationID: Encrypt(ID),
            Field: Encrypt(Field)
        };
        await fetch(`/API/incrementEvaluation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj)
        });
        let tempObj2 = {
            Grade: {
                ID: Encrypt(ID),
                param1: Encrypt(Grade),
                param2: Encrypt(Decimal)
            }
        };
        await fetch(`/API/changeGrade`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj2)
        });
    }

    async decrementDB(ID, Field, Grade, Decimal) {
        this.setState({});
        this.props.refreshPage();
        let tempObj = {
            EvaluationID: Encrypt(ID),
            Field: Encrypt(Field)
        };
        await fetch(`/API/decrementEvaluation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj)
        });
        let tempObj2 = {
            Grade: {
                ID: Encrypt(ID),
                param1: Encrypt(Grade),
                param2: Encrypt(Decimal)
            }
        };
        await fetch(`/API/changeGrade`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj2)
        });
    }

    async handleInc(Evaluation, Field) {
        let tempGrade = this.calculateGrade(Evaluation);
        Evaluation[Field]++;
        await this.incrementDB(Evaluation.ID, Field, Math.floor(tempGrade), Math.floor(100 * (tempGrade - Math.floor(tempGrade))));
    }

    async handleDec(Evaluation, Field) {
        if(Evaluation[Field] > 0) {
            Evaluation[Field]--;
            let tempGrade = this.calculateGrade(Evaluation);
            await this.decrementDB(Evaluation.ID, Field, Math.floor(tempGrade), Math.floor(100 * (tempGrade - Math.floor(tempGrade))));
        }
    }

    async handleIncG(Evaluation, Field) {
        Evaluation[Field]++;
        let tempGrade = this.calculateGrade(Evaluation);
        await this.incrementDB(Evaluation.ID, Field, Math.floor(tempGrade), Math.floor(100 * (tempGrade - Math.floor(tempGrade))));
    }

    async handleDecG(Evaluation, Field) {
        if(Evaluation[Field] > 0) {
            Evaluation[Field]--;
            let tempGrade = this.calculateGrade(Evaluation);
            await this.decrementDB(Evaluation.ID, Field, Math.floor(tempGrade), Math.floor(100 * (tempGrade - Math.floor(tempGrade))));
        }
    }

}