import './App.css';
import React from 'react';
import Form from './Form';
import ReactDOM from 'react-dom';

const LoginChecker = require('./LoginChecker.js');
const lc = new LoginChecker.Check();

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      correct: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div style = {{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <h1>Hello</h1>
        <Form onSubmit = {this.handleSubmit}/>
        <h1>{this.state.correct}</h1>
      </div>
    );
  }

  handleSubmit(Username, Password) {
    var temp = lc.checkCredentials(Username, Password);
    alert(temp);
    this.state = {
      correct: temp
    };
  }

}

ReactDOM.render(<App />, document.getElementById('root'))