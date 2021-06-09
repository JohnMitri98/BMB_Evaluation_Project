import './App.css';
import React from 'react';

export default class App extends React.Component {

  render() {
    return (
      <div style = {{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <h1>Hello World!</h1>
        <h2>This is text.</h2>
      </div>
    );
  }

}