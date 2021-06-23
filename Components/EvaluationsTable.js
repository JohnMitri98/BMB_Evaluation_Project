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
        this.handleNBFTInc = this.handleNBFTInc.bind(this);
        this.handleNBFCInc = this.handleNBFCInc.bind(this);
        this.handleNBBTInc = this.handleNBBTInc.bind(this);
        this.handleNBBCInc = this.handleNBBCInc.bind(this);
        this.handleNBPRInc = this.handleNBPRInc.bind(this);
        this.handleNBPRRInc = this.handleNBPRRInc.bind(this);
        this.handleNBPRSInc = this.handleNBPRSInc.bind(this);
        this.handleNBPRAInc = this.handleNBPRAInc.bind(this);
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
                            <Link onClick={() => this.handleNBFTInc(Evaluation)} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                                +
                            </Link>
                    </td>
                    <td style = {{textAlign: "center"}}>
                        {Nb_Features_Completed}
                        <Link onClick={() => this.handleNBFCInc(Evaluation)} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                    </td>
                    <td style = {{textAlign: "center"}}>
                        {Nb_Bugs_Taken}
                        <Link onClick={() => this.handleNBBTInc(Evaluation)} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                    </td>
                    <td style = {{textAlign: "center"}}>
                        {Nb_Bugs_Completed}
                        <Link onClick={() => this.handleNBBCInc(Evaluation)} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                    </td>
                    <td style = {{textAlign: "center"}}>
                        {Nb_PR}
                        <Link onClick={() => this.handleNBPRInc(Evaluation)} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                    </td>
                    <td style = {{textAlign: "center"}}>
                        {Nb_PR_Rejected}
                        <Link onClick={() => this.handleNBPRRInc(Evaluation)} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                    </td>
                    <td style = {{textAlign: "center"}}>
                        {Nb_PR_Severe}
                        <Link onClick={() => this.handleNBPRSInc(Evaluation)} style={{ textDecoration: 'none', paddingLeft: 5 }}>
                            +
                        </Link>
                    </td>
                    <td style = {{textAlign: "center"}}>
                        {Nb_PR_Abandoned}
                        <Link onClick={() => this.handleNBPRAInc(Evaluation)} style={{ textDecoration: 'none', paddingLeft: 5 }}>
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

    async handleNBFTInc(Evaluation) {
        let tempGrade = this.calculateGrade(Evaluation);
        await this.incrementDB(Evaluation.ID, "Nb_Features_Taken", Math.floor(tempGrade), Math.floor(100 * (tempGrade - Math.floor(tempGrade))));
    }

    async handleNBFCInc(Evaluation) {
        let tempGrade = this.calculateGrade(Evaluation);
        await this.incrementDB(Evaluation.ID, "Nb_Features_Completed", Math.floor(tempGrade), Math.floor(100 * (tempGrade - Math.floor(tempGrade))));
    }

    async handleNBBTInc(Evaluation) {
        let tempGrade = this.calculateGrade(Evaluation);
        await this.incrementDB(Evaluation.ID, "Nb_Bugs_Taken", Math.floor(tempGrade), Math.floor(100 * (tempGrade - Math.floor(tempGrade))));
    }

    async handleNBBCInc(Evaluation) {
        let tempGrade = this.calculateGrade(Evaluation);
        await this.incrementDB(Evaluation.ID, "Nb_Bugs_Completed", Math.floor(tempGrade), Math.floor(100 * (tempGrade - Math.floor(tempGrade))));
    }

    async handleNBPRInc(Evaluation) {
        let tempEval = Evaluation;
        tempEval.Nb_PR++;
        let tempGrade = this.calculateGrade(tempEval);
        await this.incrementDB(Evaluation.ID, "Nb_PR", Math.floor(tempGrade), Math.floor(100 * (tempGrade - Math.floor(tempGrade))));
    }

    async handleNBPRRInc(Evaluation) {
        let tempEval = Evaluation;
        tempEval.Nb_PR_Rejected++;
        let tempGrade = this.calculateGrade(tempEval);
        await this.incrementDB(Evaluation.ID, "Nb_PR_Rejected", Math.floor(tempGrade), Math.floor(100 * (tempGrade - Math.floor(tempGrade))));
    }

    async handleNBPRSInc(Evaluation) {
        let tempEval = Evaluation;
        tempEval.Nb_PR_Severe++;
        let tempGrade = this.calculateGrade(tempEval);
        await this.incrementDB(Evaluation.ID, "Nb_PR_Severe", Math.floor(tempGrade), Math.floor(100 * (tempGrade - Math.floor(tempGrade))));
    }

    async handleNBPRAInc(Evaluation) {
        let tempEval = Evaluation;
        tempEval.Nb_PR_Abandoned++;
        let tempGrade = this.calculateGrade(tempEval);
        await this.incrementDB(Evaluation.ID, "Nb_PR_Abandoned", Math.floor(tempGrade), Math.floor(100 * (tempGrade - Math.floor(tempGrade))));
    }

}