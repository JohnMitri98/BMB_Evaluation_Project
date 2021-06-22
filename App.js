import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import UserView from './Pages/UserView';
//import AdminView from './Pages/AdminView';
import EvaluationsPage from './Pages/EvaluationsPage';
import ProfilePage from './Pages/ProfilePage';
import MyEvaluationsPage from './Pages/MyEvaluationsPage';
import PerformancePage from './Pages/PerformancePage';
import DetailsPage from './Pages/DetailsPage';
import DetailsEditPage from './Pages/DetailsEditPage';

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
  },
  EvaluationID: 0
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
    this.state = {
      ...initialState,
      previousPageHistory: []
    };
    this.checkLogin = this.checkLogin.bind(this);
    this.resetLogin = this.resetLogin.bind(this);
    this.signOut = this.signOut.bind(this);
    this.setEvaluationIdForDetails = this.setEvaluationIdForDetails.bind(this);
    this.setPreviousPage = this.setPreviousPage.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  render() {
    let warning;
    if(window.location.pathname !== "/") {
      warning = null;
    }
    if((this.state.correct + "") === "false") {
      warning = <h1>Incorrect Username or Password</h1>
    }
    let history = [this.setPreviousPage, this.goBack];

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
              <Route exact path="/UserView">
                <UserView style = {divStyle} loggedIn = {this.state.loggedIn} permissions = {this.state.roles} history = {history} />
              </Route>
              {/*<Route exact path="/AdminView">
                <AdminView style = {divStyle} loggedIn = {this.state.loggedIn} />
              </Route>*/}
              <Route exact path="/UserView/Evaluations">
                <EvaluationsPage style = {divStyle} loggedIn = {this.state.loggedIn} ID = {this.state.UserID} EvaluatorName = {this.state.User + ""} onDetailsButton = {this.setEvaluationIdForDetails} history = {history} />
              </Route>
              <Route exact path="/UserView/MyProfile">
                <ProfilePage style = {divStyle} loggedIn = {this.state.loggedIn} history = {history} />
              </Route>
              <Route exact path="/UserView/MyEvaluations">
                <MyEvaluationsPage style = {divStyle} loggedIn = {this.state.loggedIn} history = {history} />
              </Route>
              <Route exact path="/UserView/Performance">
                <PerformancePage style = {divStyle} loggedIn = {this.state.loggedIn} history = {history} />
              </Route>
              <Route exact path="/UserView/Details">
                <DetailsPage style = {divStyle} loggedIn = {this.state.loggedIn} EvaluationID = {this.state.EvaluationID} history = {history} />
              </Route>
              <Route exact path="/UserView/Details/DetailsEdit">
                <DetailsEditPage style = {divStyle} loggedIn = {this.state.loggedIn} EvaluatorID = {this.state.UserID} EvaluationID = {this.state.EvaluationID} history = {history} />
              </Route>
              <Route exact path="/">
                <LoginPage style = {divStyle} onSubmit = {this.checkLogin} history = {history} />
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
        UserID: parseInt(UserID),
        loggedIn: true,
        roles: Roles
      });
      let tempHistory = this.state.previousPageHistory;
      /*if((Roles.Name + "") === "Admin") {
        this.setState({
          redirect: <Redirect exact from = "/" to = "/AdminView" />
        });
      } else {*/
        if(this.state.previousPageHistory.length === 0) {
          tempHistory.push("/");
          this.setState({
            redirect: <Redirect exact from = "/" to = "/UserView" />,
            previousPageHistory: tempHistory
          });
        } else {
          this.goBack();
        }
      //}
    } else {
      this.setState(initialState);
      this.setState({correct: false});
    }
  }

  setPreviousPage(page) {
    let tempPageHistory = this.state.previousPageHistory;
    tempPageHistory.push(page);
    this.setState({
      previousPageHistory: tempPageHistory
    });
  }

  async goBack() {
    let tempHistory = this.state.previousPageHistory;
    let redirectPath = tempHistory.pop();
    await this.setState({
      previousPageHistory: tempHistory,
      redirect: <Redirect exact to = {redirectPath + ""} />
    });
    await this.setState({
      redirect: null
    })
  }

  setEvaluationIdForDetails(ID) {
    this.setState({
      EvaluationID: ID
    });
  }

  async signOut() {
    await this.setState({
      redirect: <Redirect exact to = "/" />,
      previousPageHistory: []
    });
    this.resetLogin();
  }

  resetLogin() {
    this.setState(initialState);
  }

}

ReactDOM.render(<App />, document.getElementById('root'))