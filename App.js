import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import UserView from './Pages/UserView';
import AdminView from './Pages/AdminView';

const initialState = {
  correct: null,
  User: null,
  loggedIn: false,
  redirect: null,
  roles: {
    Name: "",
    Evaluation_View: null,
    Details_View: null,
    User_Edit_View: null,
    User_Performance_View: null
  }
};

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.checkLogin = this.checkLogin.bind(this);
    this.resetLogin = this.resetLogin.bind(this);
  }

  render() {
    let welcome;
    if(this.state.loggedIn) {
      welcome = <h1>Welcome, {this.state.User}</h1>;
    } else if(window.location.pathname !== "/") {
      welcome = null;
    }
    if((this.state.correct + "") === "false") {
      welcome = <h1>Incorrect Username or Password</h1>
    }
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/" onClick = {this.resetLogin}>Login</Link>
              </li>
              <li>
                <Link to="/turtles">Turtles</Link>
              </li>
              {/*<li>
                <Link to="/users">Users</Link>
              </li>*/}
            </ul>
          </nav>
          <div style = {{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <Switch>
              {this.state.redirect}
              <Route path="/turtles">
                <ILikeTurtles loggedIn = {this.state.loggedIn} likesTurtles = {this.state.roles.Evaluation_View} />
              </Route>
              <Route path="/userView">
                <UserView loggedIn = {this.state.loggedIn} />
              </Route>
              <Route path="/adminView">
                <AdminView loggedIn = {this.state.loggedIn} />
              </Route>
              <Route path="/">
                <LoginPage onSubmit = {this.checkLogin} />
                {welcome}
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }

  checkLogin(Correct, Username, Roles) {
    if(Correct === "true") {
      this.setState({
        correct: true,
        User: Username,
        loggedIn: true,
        roles: Roles
      });
      if((Roles.Name + "") === "Admin") {
        this.setState({
          redirect: <Redirect exact from = "/" to = "/adminView" />
        });
      } else {
        this.setState({
          redirect: <Redirect exact from = "/" to = "/userView" />
        });
      }
    } else {
      this.setState(initialState);
      this.setState({correct: false});
    }
  }

  resetLogin() {
    this.setState(initialState);
  }

}

function ILikeTurtles(props) {
  if((props.loggedIn + "") === "false") {
    return (<Redirect to = "../" />);
  }
  return (
    <div style = {{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <h1>I like turtles: {props.likesTurtles + ""}</h1>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))