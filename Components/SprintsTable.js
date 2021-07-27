import React from 'react';

export default class SprintsTable extends React.Component {

    constructor(props) {
        super(props);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
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
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
            </tr>
        );
    }

    renderTableData() {
        return this.props.Sprints.map((Sprint, index) => {
            const {Name,
                Start_Date,
                End_Date
            } = Sprint;
            return (
                <tr key = {index}>
                    <td id = "Name" style = {{fontWeight: "bold"}}>
                        {Name}
                    </td>
                    <td>
                        {new Date(Start_Date).toDateString()}
                    </td>
                    <td>
                        {new Date(End_Date).toDateString()}
                    </td>
                </tr>
            );
        });
    }

}