import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Encrypt} from '../Encryption/Encryptor';

export default class SprintCreationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Sprint: {
                Name: "",
                StartDate: "",
                EndDate: "",
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    
    render() {
        let {Name, StartDate, EndDate} = this.state.Sprint;
        return (
            <form onSubmit={this.handleSubmit} class = {this.state.formClass}>
                <div style = {this.props.style}>
                    <div>
                        <label>
                            Name: 
                        </label>
                        <input type = "text" value = {Name} onChange = {this.handleNameChange} />
                    </div>
                    <div>
                        <label>
                            Start Date:
                        </label>
                        <DatePicker selected = {StartDate} value = {StartDate} onChange = {(date) => this.handleStartDateChange(date)} />
                    </div>
                    <div>
                        <label>
                            End Date: 
                        </label>
                        <DatePicker selected = {EndDate} value = {EndDate} onChange = {(date) => this.handleEndDateChange(date)} />
                    </div>
                    <input type = "submit" value = "Submit" onSubmit = {this.onSubmit}/>
                </div>
            </form>
        )
    }

    async handleSubmit(e) {
        e.preventDefault();
        let {Name, StartDate, EndDate} = this.state.Sprint;
        if(!StartDate || !EndDate || !Name || (StartDate === "") || (EndDate === "") || (Name === "") || (new Date(StartDate) >= new Date(EndDate)) ||(new Date(StartDate) < new Date(this.props.lastSprint.endDate))) {
            this.setState({
                Sprint: {
                    Name: "",
                    StartDate: "",
                    EndDate: ""
                }
            });
            this.props.onSubmit(false);
        } else {
            let tempObj = {
                Sprint: {
                    Name: Encrypt(Name),
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
        let {Name, EndDate} = this.state.Sprint;
        let tempObj = {
            Name: Name,
            StartDate: date,
            EndDate: EndDate
        };
        this.setState({
            Sprint: tempObj
        });
    }

    handleEndDateChange(date) {
        let {Name, StartDate} = this.state.Sprint;
        let tempObj = {
            Name: Name,
            StartDate: StartDate,
            EndDate: date
        };
        this.setState({
            Sprint: tempObj
        });
    }

    handleNameChange(event) {
        let {StartDate, EndDate} = this.state.Sprint;
        let tempObj = {
            Name: event.target.value,
            StartDate: StartDate,
            EndDate: EndDate
        };
        this.setState({
            Sprint: tempObj
        });
    }

}