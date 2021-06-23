import React from 'react';


let ss = 1;
let sa = 2;
let st = 0.2;


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
                <table>
                    <tbody>
                        {this.renderTotalTableHeader()}
                        {this.renderTotalTableData()}
                    </tbody>
                </table>
                <h1>Performance in Last Evaluation: </h1>
                <table>
                    <tbody>
                        {this.renderPreviousTableHeader()}
                        {this.renderPreviousTableData()}
                    </tbody>
                </table>
            </div>
        );
    }

    renderTotalTableHeader() {
        return (
            <tr>
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

    renderPreviousTableHeader() {
        return (
            <tr>
                <th style = {{textAlign: "center"}}>Evaluator</th>
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

    renderTotalTableData() {
        let totalEvaluations = {
            TotalNBFT: 0,
            TotalNBFC: 0,
            TotalNBBT: 0,
            TotalNBBC: 0,
            TotalNBPR: 0,
            TotalNBPRR: 0,
            TotalNBPRS: 0,
            TotalNBPRA: 0
        };
        this.props.TotalEvaluations.map((Evaluation, index) => {
            const {Nb_Features_Taken,
                Nb_Features_Completed,
                Nb_Bugs_Taken,
                Nb_Bugs_Completed,
                Nb_PR,
                Nb_PR_Rejected,
                Nb_PR_Severe,
                Nb_PR_Abandoned
            } = Evaluation;
            totalEvaluations.TotalNBFT += parseInt(Nb_Features_Taken);
            totalEvaluations.TotalNBFC += parseInt(Nb_Features_Completed);
            totalEvaluations.TotalNBBT += parseInt(Nb_Bugs_Taken);
            totalEvaluations.TotalNBBC += parseInt(Nb_Bugs_Completed);
            totalEvaluations.TotalNBPR += parseInt(Nb_PR);
            totalEvaluations.TotalNBPRR += parseInt(Nb_PR_Rejected);
            totalEvaluations.TotalNBPRS += parseInt(Nb_PR_Severe);
            totalEvaluations.TotalNBPRA += parseInt(Nb_PR_Abandoned);
        });
        let Grade = Math.floor(((totalEvaluations.TotalNBPRR / totalEvaluations.TotalNBPR * 100) + (totalEvaluations.TotalNBPRS * ss) + (totalEvaluations.TotalNBPRA * sa) - (totalEvaluations.TotalNBPR * st)) * 100) / 100;
        return (
            <tr>
                <td style = {{textAlign: "center"}}>{totalEvaluations.TotalNBFT}</td>
                <td style = {{textAlign: "center"}}>{totalEvaluations.TotalNBFC}</td>
                <td style = {{textAlign: "center"}}>{totalEvaluations.TotalNBBT}</td>
                <td style = {{textAlign: "center"}}>{totalEvaluations.TotalNBBC}</td>
                <td style = {{textAlign: "center"}}>{totalEvaluations.TotalNBPR}</td>
                <td style = {{textAlign: "center"}}>{totalEvaluations.TotalNBPRR}</td>
                <td style = {{textAlign: "center"}}>{totalEvaluations.TotalNBPRS}</td>
                <td style = {{textAlign: "center"}}>{totalEvaluations.TotalNBPRA}</td>
                <td style = {{textAlign: "center"}}>{Grade}</td>
            </tr>
        );
    }

    renderPreviousTableData() {
        return this.props.PreviousEvaluation.map((Evaluation, index) => {
            const {First_Name,
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
                    <td id = "Name" style = {{textAlign: "center"}}>{First_Name + " " + Last_Name}</td>
                    <td style = {{textAlign: "center"}}>{Sprint_ID}</td>
                    <td style = {{textAlign: "center"}}>{Nb_Features_Taken}</td>
                    <td style = {{textAlign: "center"}}>{Nb_Features_Completed}</td>
                    <td style = {{textAlign: "center"}}>{Nb_Bugs_Taken}</td>
                    <td style = {{textAlign: "center"}}>{Nb_Bugs_Completed}</td>
                    <td style = {{textAlign: "center"}}>{Nb_PR}</td>
                    <td style = {{textAlign: "center"}}>{Nb_PR_Rejected}</td>
                    <td style = {{textAlign: "center"}}>{Nb_PR_Severe}</td>
                    <td style = {{textAlign: "center"}}>{Nb_PR_Abandoned}</td>
                    <td style = {{textAlign: "center"}}>{Grade}</td>
                </tr>
            );
        });
    }

}