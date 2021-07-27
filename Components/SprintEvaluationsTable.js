import React from 'react';

export default class EvaluationsTable extends React.Component {

    constructor(props) {
        super(props);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.handleEvaluations = this.handleEvaluations.bind(this);
        this.state = {
            SprintEvaluations: this.props.SprintEvaluations
        };
    }

    render() {
        return(
            <div class = "tableDiv">
                <table>
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
                <th>Sprint Start Date</th>
                <th>Sprint Name</th>
                <th>Total Evaluations</th>
                <th>Evaluations</th>
            </tr>
        );
    }

    renderTableData() {
        return this.state.SprintEvaluations.map((SprintEvaluation, index) => {
            const {ID,
                Start_Date,
                Name,
                Total_Evaluations
            } = SprintEvaluation;
            return (
                <tr key = {index}>
                    <td>
                        {new Date(Start_Date).toDateString()}
                    </td>
                    <td>
                        {Name + ""}
                    </td>
                    <td>
                        {Total_Evaluations + ""}
                    </td>
                    <td>
                        <button onClick = {() => this.handleEvaluations(ID)} class = 'signOut'>
                            <div class = "extraWidth">
                                Evaluations
                            </div>
                        </button>
                    </td>
                </tr>
            );
        });
    }

    async handleEvaluations(SprintID) {
        await this.props.onEvaluationsButton[0](SprintID);
        await this.props.onEvaluationsButton[1]();
    }

}