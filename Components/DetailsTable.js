import React from 'react';

export default class DetailsTable extends React.Component {

    constructor(props) {
        super(props);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
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
                <th style = {{textAlign: "center"}}>Evaluation ID</th>
                <th style = {{textAlign: "center"}}>Supervisor</th>
                <th style = {{textAlign: "center"}}>Status</th>
                <th style = {{textAlign: "center"}}>Type</th>
                <th style = {{textAlign: "center"}}>Severity</th>
                <th style = {{textAlign: "center"}}>Description</th>
                <th style = {{textAlign: "center"}}>Link</th>
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
                    <td style = {{textAlign: "center"}}>{Evaluation_ID}</td>
                    <td id = "Supervisor" style = {{textAlign: "center"}}>{First_Name + " " + Last_Name}</td>
                    <td style = {{textAlign: "center"}}>{Status}</td>
                    <td style = {{textAlign: "center"}}>{Type}</td>
                    <td style = {{textAlign: "center"}}>{Severity}</td>
                    <td style = {{textAlign: "center"}}>{Description}</td>
                    <td style = {{textAlign: "center"}}>{Link}</td>
                </tr>
            );
        });
    }

}