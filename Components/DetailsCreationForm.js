import React from 'react';
import {Encrypt} from '../Encryption/Encryptor';

export default class DetailsCreationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Detail: {
                EvaluationID: this.props.EvaluationID,
                SupervisorID: this.props.EvaluatorID,
                Status: "Accepted",
                Type: "None",
                Severity: "",
                Description: "",
                Link: "",
                formClass: null
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSeverityChange = this.handleSeverityChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleLinkChange = this.handleLinkChange.bind(this);
    }
    
    render() {
        let {Severity, Description, Link} = this.state.Detail;
        return (
            <form onSubmit={this.handleSubmit} class = {this.state.formClass}>
                <div style = {this.props.style}>
                    <div>
                        <label>
                            Status: 
                            {/*<input type = "text" value = {Status} onChange = {this.handleStatusChange} />*/}
                            <select onChange = {this.handleStatusChange}>
                                <option value = "Accepted">Accepted</option>
                                <option value = "Rejected">Rejected</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        {this.state.Detail.Status === "Rejected" &&
                            <label>
                                Type: 
                                <select onChange = {this.handleTypeChange}>
                                    <option value = "Normal">Normal</option>
                                    <option value = "Severe">Severe</option>
                                    <option value = "Abandoned">Abandoned</option>
                                </select>
                            </label>
                        }
                    </div>
                    <div>
                        {this.state.Detail.Status === "Rejected" && this.state.Detail.Type !== "Normal" &&
                            <label>
                                Severity: 
                                <input type = "text" pattern = "[0-9]*" value = {Severity} onChange = {this.handleSeverityChange}/>
                            </label>
                        }
                    </div>
                    <div>
                        <label>
                            Description: 
                            <input type = "text" value = {Description} onChange = {this.handleDescriptionChange}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Link:* 
                            <input type = "text" value = {Link} onChange = {this.handleLinkChange}/>
                        </label>
                    </div>
                    <input type = "submit" value = "Submit" onSubmit = {this.onSubmit}/>
                </div>
            </form>
        )
    }

    async handleSubmit(e) {
        e.preventDefault();
        let {EvaluationID, SupervisorID, Status, Type, Severity, Description, Link} = this.state.Detail;
        if(Type === "") {
            Type = "None";
        }
        if(Severity === "") {
            Severity = 0;
        }
        if((Link === "")) {
            this.props.onSubmit(false);
        } else {
            let tempObj = {
                Detail: {
                    EvaluationID: Encrypt(EvaluationID),
                    SupervisorID: Encrypt(SupervisorID),
                    Status: Encrypt(Status),
                    Type: Encrypt(Type),
                    Severity: Encrypt(Severity),
                    Description: Encrypt(Description),
                    Link: Encrypt(Link)
                }
            };
            await fetch('/API/insertEvaluationDetail', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempObj)
            });
            this.props.onSubmit(true);
        }
    };

    handleStatusChange(event) {
        let {EvaluationID, SupervisorID, Severity, Description, Link} = this.state.Detail;
        let tempDetail = {
            EvaluationID: EvaluationID,
            SupervisorID: SupervisorID,
            Status: event.target.value,
            Type: (event.target.value === "Accepted" ? "None" : "Normal"),
            Severity: Severity,
            Description: Description,
            Link: Link
        }
        this.setState({
            Detail: tempDetail,
            formClass: (event.target.value === "Accepted" ? "None" : "largerDetails")
        });
    }

    handleTypeChange(event) {
        let {EvaluationID, SupervisorID, Status, Severity, Description, Link} = this.state.Detail;
        let tempDetail = {
            EvaluationID: EvaluationID,
            SupervisorID: SupervisorID,
            Status: Status,
            Type: event.target.value,
            Severity: (event.target.value === "Normal" ? "" : Severity),
            Description: Description,
            Link: Link
        }
        this.setState({Detail: tempDetail});
    }

    handleSeverityChange(event) {
        let {EvaluationID, SupervisorID, Status, Type, Description, Link} = this.state.Detail;
        if(event.target.validity.valid) {
            let tempDetail = {
                EvaluationID: EvaluationID,
                SupervisorID: SupervisorID,
                Status: Status,
                Type: Type,
                Severity: event.target.value,
                Description: Description,
                Link: Link
            }
            this.setState({Detail: tempDetail});
        }
    }

    handleDescriptionChange(event) {
        let {EvaluationID, SupervisorID, Status, Type, Severity, Link} = this.state.Detail;
        let tempDetail = {
            EvaluationID: EvaluationID,
            SupervisorID: SupervisorID,
            Status: Status,
            Type: Type,
            Severity: Severity,
            Description: event.target.value,
            Link: Link
        }
        this.setState({Detail: tempDetail});
    }

    handleLinkChange(event) {
        let {EvaluationID, SupervisorID, Status, Type, Severity, Description} = this.state.Detail;
        let tempDetail = {
            EvaluationID: EvaluationID,
            SupervisorID: SupervisorID,
            Status: Status,
            Type: Type,
            Severity: Severity,
            Description: Description,
            Link: event.target.value
        }
        this.setState({Detail: tempDetail});
    }

}