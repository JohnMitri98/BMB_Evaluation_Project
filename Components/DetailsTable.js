import React from 'react';

export default class DetailsTable extends React.Component {

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
                <th>Evaluation ID</th>
                <th>Supervisor</th>
                <th>Status</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Description</th>
                <th>Link</th>
            </tr>
        );
    }

    renderTableData() {
        return this.props.Details.map((Detail, index) => {
            const {First_Name,
                Last_Name,
                Evaluation_ID,
                Status,
                Type,
                Severity,
                Description,
                Link
            } = Detail;
            return (
                <tr key = {index}>
                    <td>{Evaluation_ID}</td>
                    <td id = "Supervisor">{First_Name + " " + Last_Name}</td>
                    <td>{Status}</td>
                    <td>{Type}</td>
                    <td>{Severity}</td>
                    <td>{Description}</td>
                    <td>{Link}</td>
                </tr>
            );
        });
    }

}