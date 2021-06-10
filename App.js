import './App.css';
import React from 'react';
import Form from './Form';
import ReactDOM from 'react-dom';

export default class App extends React.Component {

  render() {
    return (
      <div style = {{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <h1>Hello</h1>
        <Form />
      </div>
    );
  }

}

ReactDOM.render(<App />, document.getElementById('root'))