import React from 'react';
import {Link} from 'react-router-dom';

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
        this.state = {
            redirect: null
        };
    }

    render() {
        return(
            <table>
                <tbody>
                    {this.renderTableHeader()}
                    {this.renderTableData()}
                </tbody>
            </table>
        );
    }

    renderTableHeader() {
        return (
            <tr>
                <th style = {{textAlign: "center"}}>Evaluated</th>
                <th style = {{textAlign: "center"}}>Sprint ID</th>
                <th style = {{textAlign: "center"}}># FT</th>
                <th style = {{textAlign: "center"}}># FC</th>
                <th style = {{textAlign: "center"}}># BT</th>
                <th style = {{textAlign: "center"}}># BC</th>
                <th style = {{textAlign: "center"}}># PR</th>
                <th style = {{textAlign: "center"}}># PRR</th>
                <th style = {{textAlign: "center"}}># PRS</th>
                <th style = {{textAlign: "center"}}># PRA</th>
                <th style = {{textAlign: "center"}}>Grade</th>
            </tr>
        );
    }

    renderTableData() {
        return this.props.Evaluations.map((Evaluation, index) => {
            const {ID,
                First_Name,
                Last_Name,
                Sprint_ID,
                Nb_Features_Taken,
                Nb_Features_Completed,
                Nb_Bugs_Taken,
                Nb_Bugs_Completed,
                Nb_PR,
                Nb_PR_Rejected,
                Nb_PR_Severe,
                Nb_PR_Abandoned,
                Grade
            } = Evaluation;
            return (
                <tr key = {index}>
                    <td id = "Name" style = {{textAlign: "center"}}>
                        {First_Name + " " + Last_Name}
                    </td>
                    <td style = {{textAlign: "center"}}>
                        {Sprint_ID}
                    </td>
                    <td style = {{textAlign: "center"}}>
                        {Nb_Features_Taken}
                        <Link onClick={() => this.handleInc(Evaluation, "Nb_Features_Taken")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                    </td>
                    <td style = {{textAlign: "center"}}>
                        {Nb_Features_Completed}
                        <Link onClick={() => this.handleInc(Evaluation, "Nb_Features_Completed")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                    </td>
                    <td style = {{textAlign: "center"}}>
                        {Nb_Bugs_Taken}
                        <Link onClick={() => this.handleInc(Evaluation, "Nb_Bugs_Taken")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                    </td>
                    <td style = {{textAlign: "center"}}>
                        {Nb_Bugs_Completed}
                        <Link onClick={() => this.handleInc(Evaluation, "Nb_Bugs_Completed")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                    </td>
                    <td style = {{textAlign: "center"}}>
                        {Nb_PR}
                        <Link onClick={() => this.handleIncG(Evaluation, "Nb_PR")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                    </td>
                    <td style = {{textAlign: "center"}}>
                        {Nb_PR_Rejected}
                        <Link onClick={() => this.handleIncG(Evaluation, "Nb_PR_Rejected")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                    </td>
                    <td style = {{textAlign: "center"}}>
                        {Nb_PR_Severe}
                        <Link onClick={() => this.handleIncG(Evaluation, "Nb_PR_Severe")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                    </td>
                    <td style = {{textAlign: "center"}}>
                        {Nb_PR_Abandoned}
                        <Link onClick={() => this.handleIncG(Evaluation, "Nb_PR_Abandoned")} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                    </td>
                    <td style = {{textAlign: "center"}}>
                        {Grade}
                    </td>
                    <td style = {{textAlign: "center"}}>
                        <button onClick = {() => this.handleDetails(ID)}>
                            Details
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
        return ((Evaluation.Nb_PR_Rejected / Evaluation.Nb_PR * 100) + (Evaluation.Nb_PR_Severe * ss) + (Evaluation.Nb_PR_Abandoned * sa) - (Evaluation.Nb_PR * st));
    }
    
    async incrementDB(ID, Field, Grade, Decimal) {
        await fetch(`/API/incrementEvaluation-${ID}-${Field}`);
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
        this.setState({});
        this.props.refreshPage();
    }

    async handleInc(Evaluation, Field) {
        let tempGrade = this.calculateGrade(Evaluation);
        await this.incrementDB(Evaluation.ID, Field, Math.floor(tempGrade), Math.floor(100 * (tempGrade - Math.floor(tempGrade))));
    }

    async handleIncG(Evaluation, Field) {
        let tempEval = Evaluation;
        tempEval[Field]++;
        let tempGrade = this.calculateGrade(tempEval);
        await this.incrementDB(Evaluation.ID, Field, Math.floor(tempGrade), Math.floor(100 * (tempGrade - Math.floor(tempGrade))));
    }

}