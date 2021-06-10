import React from 'react';
//import ReactDOM from 'react-dom';

export default class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Username: "",
            Password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div style = {{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <div>
                        <label>
                            Username
                            <input type = "text" value = {this.state.Username} onChange = {this.handleUsernameChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password
                            <input type = "password" value = {this.state.Password} onChange = {this.handlePasswordChange}/>
                        </label>
                    </div>
                    <input type = "submit" value = "Submit" onSubmit = {this.onSubmit}/>
                </div>
            </form>
        )
    }

    handleSubmit(event) {
        alert('Username: ' + this.state.Username + '\nPassword: ' + this.state.Password);
    }

    handleUsernameChange(event) {
        this.setState({Username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({Password: event.target.value});
    }

}

//ReactDOM.render(<Form />, document.getElementById('root'))