import React from 'react';

export default class MyEvaluationsTable extends React.Component {

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
                <th>Sprint ID</th>
                <th>Start Date</th>
                <th>End Date</th>
            </tr>
        );
    }

    renderTableData() {
        return this.props.Sprints.map((Sprint, index) => {
            const {ID,
                Start_Date,
                End_Date
            } = Sprint;
            return (
                <tr key = {index}>
                    <td id = "ID" style = {{fontWeight: "bold"}}>
                        {ID}
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