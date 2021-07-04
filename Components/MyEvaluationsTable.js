import React from 'react';

let ss = 1;
let sa = 2;
let st = 0.2;

export default class MyEvaluationsTable extends React.Component {

    constructor(props) {
        super(props);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
        this.calculateGrade = this.calculateGrade.bind(this);
        this.state = {
            redirect: null
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
                <th>Evaluator</th>
                <th>Sprint ID</th>
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
                    <td id = "Name" style = {{fontWeight: "bold"}}>
                        {First_Name + " " + Last_Name}
                    </td>
                    <td>
                        {Sprint_ID}
                    </td>
                    <td>
                        {Nb_Features_Taken}
                    </td>
                    <td>
                        {Nb_Features_Completed}
                    </td>
                    <td>
                        {Nb_Bugs_Taken}
                    </td>
                    <td>
                        {Nb_Bugs_Completed}
                    </td>
                    <td>
                        {Nb_PR}
                    </td>
                    <td>
                        {Nb_PR_Rejected}
                    </td>
                    <td>
                        {Nb_PR_Severe}
                    </td>
                    <td>
                        {Nb_PR_Abandoned}
                    </td>
                    <td>
                        {Grade}
                    </td>
                    <td>
                        <button onClick = {() => this.handleDetails(ID)} class = 'details'>
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

}