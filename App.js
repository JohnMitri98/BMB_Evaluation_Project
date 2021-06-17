import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import UserView from './Pages/UserView';
//import AdminView from './Pages/AdminView';
import EvaluationsPage from './Pages/EvaluationsPage';
import ProfilePage from './Pages/ProfilePage';
import MyEvaluationsPage from './Pages/MyEvaluationsPage';
import PerformancePage from './Pages/PerformancePage';
import DetailsPage from './Pages/DetailsPage';

const initialState = {
  correct: null,
  User: null,
  UserID: 0,
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

const divStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
};

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
              {((this.state.loggedIn + "") === "true") && 
                (<button onClick = {this.signOut}>
                  Sign Out
                </button>)
              }
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
                <UserView style = {divStyle} loggedIn = {this.state.loggedIn} permissions = {this.state.roles} />
              </Route>
              {/*<Route exact path="/AdminView">
                <AdminView style = {divStyle} loggedIn = {this.state.loggedIn} />
              </Route>*/}
              <Route exact path="/UserView/Evaluations">
                <EvaluationsPage style = {divStyle} loggedIn = {this.state.loggedIn} ID = {this.state.UserID} EvaluatorName = {this.state.User + ""} />
              </Route>
              <Route exact path="/UserView/MyProfile">
                <ProfilePage style = {divStyle} loggedIn = {this.state.loggedIn} />
              </Route>
              <Route exact path="/UserView/MyEvaluations">
                <MyEvaluationsPage style = {divStyle} loggedIn = {this.state.loggedIn} />
              </Route>
              <Route exact path="/UserView/Performance">
                <PerformancePage style = {divStyle} loggedIn = {this.state.loggedIn} />
              </Route>
              <Route exact path="/UserView/Details">
                <DetailsPage style = {divStyle} loggedIn = {this.state.loggedIn} />
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

  checkLogin(Correct, Username, Roles, UserID) {
    if(Correct === "true") {
      this.setState({
        correct: true,
        User: Username,
        UserID: UserID,
        loggedIn: true,
        roles: Roles
      });
      /*if((Roles.Name + "") === "Admin") {
        this.setState({
          redirect: <Redirect exact from = "/" to = "/AdminView" />
        });
      } else {*/
        this.setState({
          redirect: <Redirect exact from = "/" to = "/UserView" />
        });
      //}
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