import React from 'react';

export default class AddUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Start_Date: "",
            End_Date: "",
           
        };
        this.handleStart_Date = this.handleStart_DateChange.bind(this);
        this.handleEnd_DateChange = this.handleEnd_DateChange.bind(this);
 
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div style = {this.props.style}>
                <div>
                        <label>
                          Start_Date
                            <input type = "text" value = {this.state.Start_Date} onChange = {this.handleStart_DateChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            End_Date
                            <input type = "text" value = {this.state.End_Date} onChange = {this.handleEnd_DateChange} />
                        </label>
                    </div>
                <div>
                         <button onClick={connection.query}>Add </button>
                        <div> {addNew} </div>
                          </div>
                </div>

            </form>
        )
    }}