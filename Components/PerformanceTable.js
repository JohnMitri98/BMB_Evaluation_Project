import React from 'react';
//import "../Styles/Table.css";
import {Bar, Pie} from 'react-chartjs-2';
import "chartjs-plugin-datalabels";

const options = {
    plugins: {
        legend: {
            display: false,
        }
        
    }
};

let pieBGColors = ["rgb(0, 220, 0)", "rgb(230, 0, 0)", "rgb(0, 220, 0)", "rgb(230, 0, 0)", "rgb(0, 0, 155)"];
/*for(let i = 0; i < 5; i++) {
    pieBGColors.push("rgb(" + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")");
}*/

export default class PerformanceTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Grades: this.props.TotalEvaluations.map((Evaluation) => {return Evaluation.Grade}),
            Labels: this.props.TotalEvaluations.map((Evaluation) => {return new Date(Evaluation.Start_Date).toDateString()}),
            PR: this.props.TotalEvaluations.map((Evaluation) => {return Evaluation.Nb_PR}),
            PRR: this.props.TotalEvaluations.map((Evaluation) => {return Evaluation.Nb_PR_Rejected}),
            PRS: this.props.TotalEvaluations.map((Evaluation) => {return Evaluation.Nb_PR_Severe}),
            PRA: this.props.TotalEvaluations.map((Evaluation) => {return Evaluation.Nb_PR_Abandoned}),
            selectedIndex: 0
        };
        this.renderTotalTableHeader = this.renderTotalTableHeader.bind(this);
        this.renderPreviousTableHeader = this.renderPreviousTableHeader.bind(this);
        this.renderTotalTableData = this.renderTotalTableData.bind(this);
        this.renderPreviousTableData = this.renderPreviousTableData.bind(this);
        this.changeSelected = this.changeSelected.bind(this);
    }

    render() {
        return(
            <div style = {this.props.style} class = "tableDiv">
                <h1>Total Performance: </h1>
                {/*<div class = "table-wrapper">*/}
                <div>
                    {/*<table class = "fl-table">*/}
                    <table>
                        <thead>
                            {this.renderTotalTableHeader()}
                        </thead>
                        <tbody>
                            {this.renderTotalTableData()}
                        </tbody>
                    </table>
                </div>
                <h1>Performance in Last Evaluation: </h1>
                <div class = "table-wrapper">
                    <table className = "fl-table">
                        <thead>
                            {this.renderPreviousTableHeader()}
                        </thead>
                        <tbody>
                            {this.renderPreviousTableData()}
                        </tbody>
                    </table>
                </div>
                <div style = {this.props.style}>
                    <h1>Grades Graph: </h1>
                    <div style = {{width: "750px", height: "auto", marginBottom: "20px"}}>
                        <Bar data = {{labels: this.state.Labels, datasets: [{backgroundColor: "rgba(0, 105, 209, 0.6)", borderColor: "rgba(0, 0, 0, 1)", borderWidth: "2", data: this.state.Grades}]}} options = {options} style = {{backgroundColor: "rgba(255, 255, 255, 0.7)"}} />
                    </div>
                    <h1>Pull Request Ratios</h1>
                    <select onChange = {this.changeSelected} style = {{width: "auto"}}>
                        {this.state.Labels.map((Label, index) => {return <option value = {index}>{Label + ""}</option>})}
                    </select>
                    <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div style = {this.props.style}>
                        <div style = {{width: "300px", height: "auto", marginBottom: "50px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Pie data = {{labels: ["PRC", "PRR"], datasets: [{label: this.state.Labels[this.state.selectedIndex], backgroundColor: pieBGColors.slice(0, 2), data: [(this.state.PR[this.state.selectedIndex] - (parseInt(this.state.PRR[this.state.selectedIndex]))), this.state.PRR[this.state.selectedIndex]]}]}} options = {{legend: {display: true, position: 'right'}}}/>
                            <Pie data = {{labels: ["PRRN", "PRS", "PRA"], datasets: [{label: this.state.Labels[this.state.selectedIndex], backgroundColor: pieBGColors.slice(2), data: [(this.state.PRR[this.state.selectedIndex] - (parseInt(this.state.PRS[this.state.selectedIndex]) + parseInt(this.state.PRA[this.state.selectedIndex]))), this.state.PRS[this.state.selectedIndex], this.state.PRA[this.state.selectedIndex]]}]}} options = {{legend: {display: true, position: 'right'}}}/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }

    changeSelected(event) {
        this.setState({
            selectedIndex: event.target.value
        });
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
            return null;
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