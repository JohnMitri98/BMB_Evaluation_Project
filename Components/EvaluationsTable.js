import React from 'react';
import {Link} from 'react-router-dom';
//import '../Styles/Table.css';

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
                        {Nb_Features_Taken}
                        <Link onClick={() => this.handleInc(Evaluation, "Nb_Features_Taken")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                        <Link onClick={() => this.handleDec(Evaluation, "Nb_Features_Taken")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            -
                        </Link>
                    </td>
                    <td>
                        {Nb_Features_Completed}
                        <Link onClick={() => this.handleInc(Evaluation, "Nb_Features_Completed")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                        <Link onClick={() => this.handleDec(Evaluation, "Nb_Features_Completed")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            -
                        </Link>
                    </td>
                    <td>
                        {Nb_Bugs_Taken}
                        <Link onClick={() => this.handleInc(Evaluation, "Nb_Bugs_Taken")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                        <Link onClick={() => this.handleDec(Evaluation, "Nb_Bugs_Taken")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            -
                        </Link>
                    </td>
                    <td>
                        {Nb_Bugs_Completed}
                        <Link onClick={() => this.handleInc(Evaluation, "Nb_Bugs_Completed")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                        <Link onClick={() => this.handleDec(Evaluation, "Nb_Bugs_Completed")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            -
                        </Link>
                    </td>
                    <td>
                        {Nb_PR}
                        <Link onClick={() => this.handleIncG(Evaluation, "Nb_PR")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                        <Link onClick={() => this.handleDecG(Evaluation, "Nb_PR")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            -
                        </Link>
                    </td>
                    <td>
                        {Nb_PR_Rejected}
                        <Link onClick={() => this.handleIncG(Evaluation, "Nb_PR_Rejected")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                        <Link onClick={() => this.handleDecG(Evaluation, "Nb_PR_Rejected")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            -
                        </Link>
                    </td>
                    <td>
                        {Nb_PR_Severe}
                        <Link onClick={() => this.handleIncG(Evaluation, "Nb_PR_Severe")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                        <Link onClick={() => this.handleDecG(Evaluation, "Nb_PR_Severe")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            -
                        </Link>
                    </td>
                    <td>
                        {Nb_PR_Abandoned}
                        <Link onClick={() => this.handleIncG(Evaluation, "Nb_PR_Abandoned")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                        <Link onClick={() => this.handleDecG(Evaluation, "Nb_PR_Abandoned")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            -
                        </Link>
                    </td>
                    <td>
                        {Grade}
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
    
    async incrementDB(ID, Field, Grade, Decimal) {
        this.setState({});
        this.props.refreshPage();
        await fetch(`/API/incrementEvaluation/${ID}-${Field}`);
        let tempObj = {
            Grade: {
                ID: ID,
                param1: Grade,
                param2: Decimal
            }
        };
        await fetch(`/API/changeGrade`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj)
        });
    }

    async decrementDB(ID, Field, Grade, Decimal) {
        this.setState({});
        this.props.refreshPage();
        await fetch(`/API/decrementEvaluation/${ID}-${Field}`);
        let tempObj = {
            Grade: {
                ID: ID,
                param1: Grade,
                param2: Decimal
            }
        };
        await fetch(`/API/changeGrade`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempObj)
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