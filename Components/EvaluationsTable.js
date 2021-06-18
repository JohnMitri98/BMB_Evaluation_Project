import React from 'react';

export default class EvaluationsTable extends React.Component {

    constructor(props) {
        super(props);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
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
                    <td style = {{textAlign: "center"}}><button onClick = {() => this.handleDetails(ID)}>Details</button></td>
                </tr>
            );
        });
    }

    handleDetails(id) {
        this.props.onDetailsButton[0](id);
        this.props.onDetailsButton[1]();
    }

}