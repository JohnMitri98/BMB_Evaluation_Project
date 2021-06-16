import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import UserView from './Pages/UserView';
import AdminView from './Pages/AdminView';
import EvaluationsPage from './Pages/EvaluationsPage';

const initialState = {
  correct: null,
  User: null,
  loggedIn: false,
  //history: useHistory,
  redirect: null,
  roles: {
    Name: "",
    Evaluation_View: null,
    Details_View: null,
    User_Edit_View: null,
    User_Performance_View: null
  }
};

const divStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
};

//const history = useHistory;

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.checkLogin = this.checkLogin.bind(this);
    this.resetLogin = this.resetLogin.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  render() {
    let warning;
    if(window.location.pathname !== "/") {
      warning = null;
    }
    if((this.state.correct + "") === "false") {
      warning = <h1>Incorrect Username or Password</h1>
    }
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <button onClick = {this.signOut}>Sign Out</button>
              {/*<li>
                <Link to="/" onClick = {this.resetLogin}>Login</Link>
              </li>
              <li>
                <Link to="/turtles">Turtles</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>*/}
            </ul>
          </nav>
          <div style = {divStyle}>
            <Switch>
              {this.state.redirect}
              {/*<Route path="/turtles">
                <ILikeTurtles loggedIn = {this.state.loggedIn} likesTurtles = {this.state.roles.Evaluation_View} />
              </Route>*/}
              <Route exact path="/UserView">
                <UserView loggedIn = {this.state.loggedIn} />
              </Route>
              <Route exact path="/AdminView">
                <AdminView loggedIn = {this.state.loggedIn} />
              </Route>
              <Route exact path="/UserView/Evaluations">
                <EvaluationsPage loggedIn = {this.state.loggedIn} />
              </Route>
              <Route exact path="/">
                <LoginPage style = {divStyle} onSubmit = {this.checkLogin} />
                {warning}
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
          redirect: <Redirect exact from = "/" to = "/AdminView" />
        });
      } else {
        this.setState({
          redirect: <Redirect exact from = "/" to = "/UserView" />
        });
      }
    } else {
      this.setState(initialState);
      this.setState({correct: false});
    }
  }

  signOut() {
    this.setState({
      redirect: <Redirect exact to = "/" />
    });
    this.resetLogin();
  }

  resetLogin() {
    this.setState(initialState);
  }

}

/*function ILikeTurtles(props) {
  if((props.loggedIn + "") === "false") {
    return (<Redirect to = "../" />);
  }
  return (
    <div style = {{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <h1>I like turtles: {props.likesTurtles + ""}</h1>
    </div>
  );
}*/

ReactDOM.render(<App />, document.getElementById('root'))