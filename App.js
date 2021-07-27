import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import UserView from './Pages/UserView';
import UsersPage from './Pages/UsersPage';
import CreateUserPage from './Pages/CreateUserPage';
import EvaluationsPage from './Pages/EvaluationsPage';
import SprintEvaluationsPage from './Pages/SprintEvaluationsPage';
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
import img2 from './Styles/fs.jpg';
import img4 from './Styles/img4.jpg';
import img5 from './Styles/MobileLogin.jpg';

const initialState = {
    correct: null,
    User: null,
    UserID: 0,
    loggedIn: false,
    redirect: null,
    roles: {
        Name: "",
        Evaluation_View: null,
        Sprint_View: null,
        User_Edit_View: null,
        Roles_View: null
    },
    EvaluationID: 0,
    SprintID: 0,
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
        this.setSprintIdForEvaluations = this.setSprintIdForEvaluations.bind(this);
        this.setPreviousPage = this.setPreviousPage.bind(this);
        this.goBack = this.goBack.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.backToHome = this.backToHome.bind(this);
    }

    render() {
        let warning;
        if(window.location.pathname !== "/") {
            warning = null;
        }
        if((this.state.correct + "") === "false") {
            warning = <h1>Incorrect Username or Password</h1>
        }
        if(this.state.loggedIn + "" === "true") {
            document.body.style.backgroundImage = `url(${img4})`;
        } else {
            document.body.style.backgroundImage = `url(${img2})`;
            if(window.matchMedia("(max-width: 768px)").matches) {
                document.body.style.backgroundImage = `url(${img5})`
            }
        }

        if((this.state.loggedIn + "" === "true") && ((this.state.CurrentPage === "/UserView/Users") || (this.state.CurrentPage === "/UserView/Users/CreateUser")) && (this.state.roles.User_Edit_View + "" !== "true")) {
            this.backToHome();
        }
        if((this.state.loggedIn + "" === "true") && ((this.state.CurrentPage === "/UserView/Sprints") || (this.state.CurrentPage === "/UserView/Sprints/CreateSprint")) && (this.state.roles.Sprint_View + "" !== "true")) {
            this.backToHome();
        }
        if((this.state.loggedIn + "" === "true") && ((this.state.CurrentPage === "/UserView/SprintEvaluations") || (this.state.CurrentPage === "/UserView/SprintEvaluations/Evaluations") || (this.state.CurrentPage === "/UserView/SprintEvaluations/Evaluations/CreateEvaluation") || (this.state.CurrentPage === "/UserView/Details/CreateDetails")) && (this.state.roles.Evaluation_View + "" !== "true")) {
            this.backToHome();
        }
        if((this.state.loggedIn + "" === "true") && (this.state.CurrentPage === "/UserView/Roles") && (this.state.roles.Roles_View + "" !== "true")) {
            this.backToHome();
        }

        let history = [this.setPreviousPage, this.goBack, this.state.previousPageHistory, this.setCurrentPage];

        return (
            <Router>
                <div class = "navDiv">
                    {(this.state.loggedIn + "") === "true" &&
                        <nav>
                            <div class = "navBar" id = "navBar">
                                <Link onClick = {this.signOut} class = "link">
                                    <div class = "extraWidthNav">
                                        Sign Out
                                    </div>
                                </Link>
                                {(this.state.CurrentPage !== "/") && 
                                    this.state.previousPageHistory.length > 1 &&
                                    <Link onClick = {this.goBack} class = "link">
                                        <div class = "extraWidthNav">
                                            Back
                                        </div>
                                    </Link>
                                }
                                {(this.state.CurrentPage !== "/UserView") && 
                                    <Link onClick = {() => this.redirectView("/UserView")} class = "link">
                                        <div class = "extraWidthNav">
                                            Home
                                        </div>
                                    </Link>
                                }
                                {(this.state.CurrentPage !== "/UserView/Users") && 
                                    (this.state.roles.User_Edit_View + "" === "true") && 
                                    <Link onClick = {() => this.redirectView("/UserView/Users")} class = "link">
                                        <div class = "extraWidthNav">
                                            Users
                                        </div>
                                    </Link>
                                }
                                {(this.state.CurrentPage !== "/UserView/Sprints") &&
                                    (this.state.roles.Sprint_View + "" === "true") && 
                                    <Link onClick = {() => this.redirectView("/UserView/Sprints")} class = "link">
                                        <div class = "extraWidthNav">
                                            Sprints
                                        </div>
                                    </Link>
                                }
                                {(this.state.CurrentPage !== "/UserView/SprintEvaluations") &&
                                    (this.state.roles.Evaluation_View + "" === "true") && 
                                    <Link onClick = {() => this.redirectView("/UserView/SprintEvaluations")} class = "link">
                                        <div class = "extraWidthNav">
                                            Evaluations
                                        </div>
                                    </Link>
                                }
                                {(this.state.CurrentPage !== "/UserView/MyEvaluations") && 
                                    <Link onClick = {() => this.redirectView("/UserView/MyEvaluations")} class = "link">
                                        <div class = "extraWidthNav">
                                            My Evaluations
                                        </div>
                                    </Link>
                                }
                                {(this.state.CurrentPage !== "/UserView/Performance") && 
                                    <Link onClick = {() => this.redirectView("/UserView/Performance")} class = "link">
                                        <div class = "extraWidthNav">
                                            My Performance
                                        </div>
                                    </Link>
                                }
                                {(this.state.CurrentPage !== "/UserView/Roles") && 
                                    (this.state.roles.Roles_View + "" === "true") && 
                                    <Link onClick = {() => this.redirectView("/UserView/Roles")} class = "link">
                                        <div class = "extraWidthNav">
                                            Roles
                                        </div>
                                    </Link>
                                }
                            </div>
                        </nav>
                    }
                    <div style = {divStyle} class = "tableDiv">
                        <Switch>
                            {this.state.redirect}
                            <Route exact path = "/UserView">
                                <UserView style = {divStyle} loggedIn = {this.state.loggedIn} history = {history} />
                            </Route>
                            <Route exact path = "/UserView/Users">
                                <UsersPage style = {divStyle} loggedIn = {this.state.loggedIn} history = {history} />
                            </Route>
                            <Route exact path = "/UserView/Users/CreateUser">
                                <CreateUserPage style = {divStyle} loggedIn = {this.state.loggedIn} history = {history} />
                            </Route>
                            <Route exact path = "/UserView/SprintEvaluations">
                                <SprintEvaluationsPage style = {divStyle} loggedIn = {this.state.loggedIn} ID = {this.state.UserID} role = {this.state.roles} onEvaluationsButton = {this.setSprintIdForEvaluations} history = {history} />
                            </Route>
                            <Route exact path = "/UserView/SprintEvaluations/Evaluations">
                                <EvaluationsPage style = {divStyle} loggedIn = {this.state.loggedIn} SprintID = {this.state.SprintID} ID = {this.state.UserID} role = {this.state.roles} onDetailsButton = {this.setEvaluationIdForDetails} history = {history} />
                            </Route>
                            <Route exact path = "/UserView/SprintEvaluations/Evaluations/CreateEvaluation">
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
            if(this.state.previousPageHistory.length === 0) {
                this.setPreviousPage("/");
                await this.setState({
                    redirect: <Redirect to = "/UserView" />
                });
                await this.setState({
                    redirect: null
                });
            } else {
                this.goBack();
            }
        } else {
            this.setState(initialState);
            this.setState({correct: false});
        }
    }

    async backToHome() {
        await this.setCurrentPage("/UserView");
        await this.setState({
            redirect: <Redirect exact to = {"/UserView"} />,
            previousPageHistory: ["/"]
        });
        await this.setState({
            redirect: null
        });
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

    setSprintIdForEvaluations(ID) {
        this.setState({
            SprintID: ID
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