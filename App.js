import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          i like turtles React
        </a>
      </header>
    </div>
  );
}*/

export default class App extends React.Component {

  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }

}

export default App;
