import './App.css';
import React from 'react';
import Form from './Form';
import ReactDOM from 'react-dom';
//import LoginChecker from './LoginChecker.js';

//const lc = new LoginChecker();

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      correct: false,
      data: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div style = {{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <h1>Hello</h1>
        <Form onSubmit = {this.handleSubmit}/>
        <h1>Yo {this.state.correct + ""}</h1>
      </div>
    );
  }

  handleSubmit(Correct) {
    if(Correct) {
      this.setState({correct: true});
    } else {
      this.setState({correct: "Turtles"});
    }
  }

  /*componentDidMount() {
    this.callBackendAPI().then(res => this.setState({data: res.express})).catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if(response.status !== 200) {
      throw Error(body.message);
    }
    console.log(body);
    return body;
  }*/

}

ReactDOM.render(<App />, document.getElementById('root'))