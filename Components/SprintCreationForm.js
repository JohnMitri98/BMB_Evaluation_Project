import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Encrypt} from '../Encryption/Encryptor';
import {Decrypt} from '../Encryption/Decryptor';

export default class SprintCreationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Sprint: {
                StartDate: "",
                EndDate: ""
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }
    
    render() {
        let {StartDate, EndDate} = this.state.Sprint;
        return (
            <form onSubmit={this.handleSubmit} class = {this.state.formClass}>
                <div style = {this.props.style}>
                    <div>
                        <label>
                            Start Date:
                            <DatePicker selected = {StartDate} value = {StartDate} onChange = {(date) => this.handleStartDateChange(date)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            End Date: 
                            <DatePicker selected = {EndDate} value = {EndDate} onChange = {(date) => this.handleEndDateChange(date)} />
                        </label>
                    </div>
                    <input type = "submit" value = "Submit" onSubmit = {this.onSubmit}/>
                </div>
            </form>
        )
    }

    async handleSubmit(e) {
        e.preventDefault();
        let {StartDate, EndDate} = this.state.Sprint;
        if(!StartDate || !EndDate || (StartDate === "") || (EndDate === "")) {
            this.setState({
                Sprint: {
                    StartDate: "",
                    EndDate: ""
                }
            });
            this.props.onSubmit(false);
        } else {
            let tempObj = {
                Sprint: {
                    StartDate: Encrypt(StartDate),
                    EndDate: Encrypt(EndDate)
                }
            };
            await fetch('/API/insertSprint', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempObj)
            });
            this.props.onSubmit(true);
        }
    };

    handleStartDateChange(date) {
        let {EndDate} = this.state.Sprint;
        let tempObj = {
            StartDate: date,
            EndDate: EndDate
        };
        this.setState({
            Sprint: tempObj
        });
    }

    handleEndDateChange(date) {
        let {StartDate} = this.state.Sprint;
        let tempObj = {
            StartDate: StartDate,
            EndDate: date
        };
        this.setState({
            Sprint: tempObj
        });
    }

}