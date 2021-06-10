import React from 'react';
//import ReactDOM from 'react-dom';

export default class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    render() {
        return (
            <form>
                <div style = {{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <div>
                        <label>
                            Username
                            <input type = "text" name = "Username" />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password
                            <input type = "text" name = "Password" />
                        </label>
                    </div>
                    <input type = "submit" value = "Submit" onSubmit = {this.onSubmit}/>
                </div>
            </form>
        )
    }

}

//ReactDOM.render(<Form />, document.getElementById('root'))