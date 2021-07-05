import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import UserView from './Pages/UserView';
import UsersPage from './Pages/UsersPage';
import CreateUserPage from './Pages/CreateUserPage';
//import AdminView from './Pages/AdminView';
import EvaluationsPage from './Pages/EvaluationsPage';
import ProfilePage from './Pages/ProfilePage';
import MyEvaluationsPage from './Pages/MyEvaluationsPage';
import PerformancePage from './Pages/PerformancePage';
import DetailsPage from './Pages/DetailsPage';
import CreateDetailsPage from './Pages/CreateDetailsPage';
import CreateEvaluationPage from './Pages/CreateEvaluationPage';
import SprintsPage from './Pages/SprintsPage';
import CreateSprintPage from './Pages/CreateSprintPage';
import RolesPage from './Pages/RolesPage';
import './Styles/Test.css';

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
        User_Performance_View: null,
        Roles_View: null
    },
    EvaluationID: 0,
    CurrentPage: "/"
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
        this.setCurrentPage = this.setCurrentPage.bind(this);
    }

    render() {
        let warning;
        if(window.location.pathname !== "/") {
            warning = null;
        }
        if((this.state.correct + "") === "false") {
            warning = <h1>Incorrect Username or Password</h1>
        }
        let history = [this.setPreviousPage, this.goBack, this.state.previousPageHistory, this.setCurrentPage];

        return (
            <Router>
                <div style = {divStyle}>
                    {(this.state.loggedIn + "") === "true" &&
                        <nav>
                            <div class = "navBar">
                                <button onClick = {this.signOut} class = "signOut">
                                    <div class = "extraWidth">
                                        Sign Out
                                    </div>
                                </button>
                                {(this.state.CurrentPage !== "/") && 
                                    (this.state.CurrentPage !== "/UserView") && 
                                    <button onClick = {this.goBack} class = "signOut">
                                        <div class = "extraWidth">
                                            Back
                                        </div>
                                    </button>
                                }
                                {(this.state.CurrentPage !== "/UserView") && 
                                    <button onClick = {() => this.redirectView("/UserView")} class = "signOut">
                                        <div class = "extraWidth">
                                            Home
                                        </div>
                                    </button>
                                }
                                {(this.state.CurrentPage !== "/UserView/Users") && 
                                    <button onClick = {() => this.redirectView("/UserView/Users")} class = "signOut">
                                        <div class = "extraWidth">
                                            Users
                                        </div>
                                    </button>
                                }
                                {(this.state.CurrentPage !== "/UserView/Sprints") &&
                                    <button onClick = {() => this.redirectView("/UserView/Sprints")} class = "signOut">
                                        <div class = "extraWidth">
                                            Sprints
                                        </div>
                                    </button>
                                }
                                {(this.state.roles.Evaluation_View + "" === "true") && 
                                    (this.state.CurrentPage !== "/UserView/Evaluations") &&
                                    <button onClick = {() => this.redirectView("/UserView/Evaluations")} class = "signOut">
                                        <div class = "extraWidth">
                                            Evaluations
                                        </div>
                                    </button>
                                }
                                {(this.state.CurrentPage !== "/UserView/MyEvaluations") && 
                                    <button onClick = {() => this.redirectView("/UserView/MyEvaluations")} class = "signOut">
                                        <div class = "extraWidth">
                                            My Evaluations
                                        </div>
                                    </button>
                                }
                                {(this.state.CurrentPage !== "/UserView/Performance") && 
                                    <button onClick = {() => this.redirectView("/UserView/Performance")} class = "signOut">
                                        <div class = "extraWidth">
                                            My Performance
                                        </div>
                                    </button>
                                }
                                {(this.state.roles.Roles_View + "" === "true") && 
                                    (this.state.CurrentPage !== "/UserView/Roles") && 
                                    <button onClick = {() => this.redirectView("/UserView/Roles")} class = "signOut">
                                        <div class = "extraWidth">
                                            Roles
                                        </div>
                                    </button>
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
                            </div>
                        </nav>
                    }
                    <div style = {divStyle}>
                        <Switch>
                            {this.state.redirect}
                            <Route exact path = "/UserView">
                                <UserView style = {divStyle} loggedIn = {this.state.loggedIn} permissions = {this.state.roles} history = {history} />
                            </Route>
                            {/*<Route exact path="/AdminView">
                                <AdminView style = {divStyle} loggedIn = {this.state.loggedIn} />
                            </Route>*/}
                            <Route exact path = "/UserView/Users">
                                <UsersPage style = {divStyle} loggedIn = {this.state.loggedIn} history = {history} />
                            </Route>
                            <Route exact path = "/UserView/Users/CreateUser">
                                <CreateUserPage style = {divStyle} loggedIn = {this.state.loggedIn} history = {history} />
                            </Route>
                            <Route exact path = "/UserView/Evaluations">
                                <EvaluationsPage style = {divStyle} loggedIn = {this.state.loggedIn} ID = {this.state.UserID} role = {this.state.roles.Name} onDetailsButton = {this.setEvaluationIdForDetails} history = {history} />
                            </Route>
                            <Route exact path = "/UserView/Evaluations/CreateEvaluation">
                                <CreateEvaluationPage style = {divStyle} loggedIn = {this.state.loggedIn} EvaluatorID = {this.state.UserID} role = {this.state.roles.Name} history = {history} />
                            </Route>
                            <Route exact path = "/UserView/MyProfile">
                                <ProfilePage style = {divStyle} loggedIn = {this.state.loggedIn} history = {history} />
                            </Route>
                            <Route exact path = "/UserView/MyEvaluations">
                                <MyEvaluationsPage style = {divStyle} loggedIn = {this.state.loggedIn} ID = {this.state.UserID} onDetailsButton = {this.setEvaluationIdForDetails} history = {history} />
                            </Route>
                            <Route exact path = "/UserView/Performance">
                                <PerformancePage style = {divStyle} loggedIn = {this.state.loggedIn} UserID = {this.state.UserID} history = {history} />
                            </Route>
                            <Route exact path = "/UserView/Details">
                                <DetailsPage style = {divStyle} loggedIn = {this.state.loggedIn} EvaluationID = {this.state.EvaluationID} history = {history} />
                            </Route>
                            <Route exact path = "/UserView/Details/CreateDetails">
                                <CreateDetailsPage style = {divStyle} loggedIn = {this.state.loggedIn} EvaluatorID = {this.state.UserID} EvaluationID = {this.state.EvaluationID} history = {history} />
                            </Route>
                            <Route exact path = "/UserView/Sprints">
                                <SprintsPage style = {divStyle} loggedIn = {this.state.loggedIn} history = {history} />
                            </Route>
                            <Route exact path = "/UserView/Sprints/CreateSprint">
                                <CreateSprintPage style = {divStyle} loggedIn = {this.state.loggedIn} history = {history} />
                            </Route>
                            <Route exact path = "/UserView/Roles">
                                <RolesPage style = {divStyle} loggedIn = {this.state.loggedIn} history = {history} />
                            </Route>
                            <Route exact path = "/">
                                <LoginPage style = {divStyle} onSubmit = {this.checkLogin} history = {history} />
                                {warning}
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }

    async checkLogin(Correct, Username, Roles, UserID) {
        if(Correct === "true") {
        this.setState({
            correct: true,
            User: Username,
            UserID: parseInt(UserID),
            loggedIn: true,
            roles: Roles
        });
        /*if((Roles.Name + "") === "Admin") {
            this.setState({
            redirect: <Redirect exact from = "/" to = "/AdminView" />
            });
        } else {*/
        if(this.state.previousPageHistory.length === 0) {
            this.setPreviousPage("/");
            this.setState({
                redirect: <Redirect to = "/UserView" />
            });
            this.setState({
                redirect: null
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
        this.state.previousPageHistory.push(page);
    }

    async goBack() {
        let redirectPath = this.state.previousPageHistory.pop();
        await this.setState({
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

    async redirectView(redirection) {
        this.setPreviousPage(this.state.CurrentPage);
        await this.setState({
            redirect: <Redirect exact to = {redirection} />
        });
        await this.setState({
            redirect: null
        });
    }

    setCurrentPage(page) {
        this.setState({
            CurrentPage: page
        });
    }

}

ReactDOM.render(<App />, document.getElementById('root'))