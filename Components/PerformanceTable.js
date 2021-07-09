import React from 'react';
//import "../Styles/Table.css";

export default class PerformanceTable extends React.Component {

    constructor(props) {
        super(props);
        this.renderTotalTableHeader = this.renderTotalTableHeader.bind(this);
        this.renderPreviousTableHeader = this.renderPreviousTableHeader.bind(this);
        this.renderTotalTableData = this.renderTotalTableData.bind(this);
        this.renderPreviousTableData = this.renderPreviousTableData.bind(this);
    }

    render() {
        return(
            <div style = {this.props.style}>
                <h1>Total Performance: </h1>
                {/*<div class = "table-wrapper">*/}
                <div>
                    {/*<table class = "fl-table">*/}
                    <table>
                        <tbody>
                            {this.renderTotalTableHeader()}
                            {this.renderTotalTableData()}
                        </tbody>
                    </table>
                </div>
                <h1>Performance in Last Evaluation: </h1>
                <div class = "table-wrapper">
                    <table class = "fl-table">
                        <tbody>
                            {this.renderPreviousTableHeader()}
                            {this.renderPreviousTableData()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    renderTotalTableHeader() {
        return (
            <tr>
                <th>Features Taken</th>
                <th>Features Completed</th>
                <th>Bugs Taken</th>
                <th>Bugs Completed</th>
                <th>Pull Requests</th>
                <th>Pull Requests Rejected</th>
                <th>Pull Requests Severe</th>
                <th>Pull Requests Abandoned</th>
                <th>Grade</th>
            </tr>
        );
    }

    renderPreviousTableHeader() {
        return (
            <tr>
                <th>Evaluator</th>
                <th>Sprint Start Date</th>
                <th>Sprint Name</th>
                <th>Features Taken</th>
                <th>Features Completed</th>
                <th>Bugs Taken</th>
                <th>Bugs Completed</th>
                <th>Pull Requests</th>
                <th>Pull Requests Rejected</th>
                <th>Pull Requests Severe</th>
                <th>Pull Requests Abandoned</th>
                <th>Grade</th>
            </tr>
        );
    }

    renderTotalTableData() {
        let totalEvaluations = {
            TotalNBFT: 0,
            TotalNBFC: 0,
            TotalNBBT: 0,
            TotalNBBC: 0,
            TotalNBPR: 0,
            TotalNBPRR: 0,
            TotalNBPRS: 0,
            TotalNBPRA: 0,
            Grade: 0,
            EvaluationCount: 0
        };
        this.props.TotalEvaluations.map((Evaluation, index) => {
            const {Nb_Features_Taken,
                Nb_Features_Completed,
                Nb_Bugs_Taken,
                Nb_Bugs_Completed,
                Nb_PR,
                Nb_PR_Rejected,
                Nb_PR_Severe,
                Nb_PR_Abandoned,
                Grade
            } = Evaluation;
            totalEvaluations.TotalNBFT += parseInt(Nb_Features_Taken);
            totalEvaluations.TotalNBFC += parseInt(Nb_Features_Completed);
            totalEvaluations.TotalNBBT += parseInt(Nb_Bugs_Taken);
            totalEvaluations.TotalNBBC += parseInt(Nb_Bugs_Completed);
            totalEvaluations.TotalNBPR += parseInt(Nb_PR);
            totalEvaluations.TotalNBPRR += parseInt(Nb_PR_Rejected);
            totalEvaluations.TotalNBPRS += parseInt(Nb_PR_Severe);
            totalEvaluations.TotalNBPRA += parseInt(Nb_PR_Abandoned);
            totalEvaluations.Grade += parseFloat(Grade);
            totalEvaluations.EvaluationCount++;
            return "yo";
        });
        let Grade = (totalEvaluations.Grade / totalEvaluations.EvaluationCount).toFixed(2);
        return (
            <tr>
                <td>{totalEvaluations.TotalNBFT}</td>
                <td>{totalEvaluations.TotalNBFC}</td>
                <td>{totalEvaluations.TotalNBBT}</td>
                <td>{totalEvaluations.TotalNBBC}</td>
                <td>{totalEvaluations.TotalNBPR}</td>
                <td>{totalEvaluations.TotalNBPRR}</td>
                <td>{totalEvaluations.TotalNBPRS}</td>
                <td>{totalEvaluations.TotalNBPRA}</td>
                <td>{Grade}</td>
            </tr>
        );
    }

    renderPreviousTableData() {
        return this.props.PreviousEvaluation.map((Evaluation, index) => {
            const {First_Name,
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
                Start_Date,
                Name
            } = Evaluation;
            return (
                <tr key = {index}>
                    <td id = "Name">{First_Name + " " + Last_Name}</td>
                    <td>{new Date(Start_Date).toDateString()}</td>
                    <td>{Name + ""}</td>
                    <td>{Nb_Features_Taken}</td>
                    <td>{Nb_Features_Completed}</td>
                    <td>{Nb_Bugs_Taken}</td>
                    <td>{Nb_Bugs_Completed}</td>
                    <td>{Nb_PR}</td>
                    <td>{Nb_PR_Rejected}</td>
                    <td>{Nb_PR_Severe}</td>
                    <td>{Nb_PR_Abandoned}</td>
                    <td>{Grade}</td>
                </tr>
            );
        });
    }

}