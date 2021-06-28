var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var sql = require('mssql');

const sqlConfig = {
    user: 'sa',
    password: 'myserver123',
    database: 'project',
    server: 'LAPTOP-KCA6CAEK',
    port: 49172,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 20000
    },
    options: {
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

async function checkLogin(Username, Password) {
    let tempCorrect = false;
    let tempUser = null;
    let tempUserID = 0;
    let roles = null;
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    await poolConnect;
    try {
        let roleID = null;
        const request = pool.request();
        var result = await request.query(`select * from dbo.Users where Username_Email = \'${Username}\';`);
        if(result.recordset[0]) {
            tempCorrect = (result.recordset[0].Password == Password) + "";
            tempUser = result.recordset[0].First_Name + " " + result.recordset[0].Last_Name;
            tempUserID = result.recordset[0].ID + "";
            roleID = result.recordset[0].Roles_ID;
        }
        if(roleID) {
            result = await request.query(`select * from dbo.Roles where ID = \'${roleID}\';`);
            if(result.recordset[0]) {
                roles = {
                    Name: result.recordset[0].Name,
                    Evaluation_View: result.recordset[0].Evaluation_View,
                    Details_View: result.recordset[0].Details_View,
                    User_Edit_View: result.recordset[0].User_Edit_View,
                    User_Performance_View: result.recordset[0].User_Performance_View
                };
            }
        }
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    let tempObj = {
        Correct: tempCorrect + "",
        Name: tempUser,
        UserID: tempUserID + "",
        Roles: roles
    };
    return JSON.stringify(tempObj);
}

async function getEvaluationsDone(Evaluator) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    let tempResult = [];
    await poolConnect;
    try {
        const request = pool.request();
        var result = await request.query(`select u.First_Name, u.Last_Name, e.* from dbo.Evaluations e, dbo.Users u where e.Evaluator_ID = ${Evaluator} AND e.Evaluated_ID = u.ID;`);
        result.recordset.forEach(result => tempResult.push(result));
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    let tempObj = {
        Evaluations: tempResult
    };
    return JSON.stringify(tempObj);
}

async function insertEvaluationDetail(Detail) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    await poolConnect;
    try {
        const request = pool.request();
        await request.query(`Insert into dbo.Evaluation_Details (Evaluation_ID, Supervisor_ID, Status, Type, Severity, Description, Link) values (${parseInt(Detail.EvaluationID)}, ${parseInt(Detail.SupervisorID)}, '${Detail.Status}', '${Detail.Type}', ${parseInt(Detail.Severity)}, '${Detail.Description}', '${Detail.Link}');`);
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
}

async function insertEvaluation(Evaluation) {
    let {EvaluatorID, EvaluatedID, SprintID, Nb_Features_Taken, Nb_Features_Completed, Nb_Bugs_Taken, Nb_Bugs_Completed, Nb_PR, Nb_PRR, Nb_PRS, Nb_PRA, Grade} = Evaluation;
    const pool = new sql.ConnectionPool(sqlConfig);
    let tempCheck = {Success: "Failed"};
    const poolConnect = pool.connect();
    await poolConnect;
    try {
        const request = pool.request();
        await request.query(`Insert into dbo.Evaluations (Evaluator_ID, Evaluated_ID, Sprint_ID, Nb_Features_Taken, Nb_Features_Completed, Nb_Bugs_Taken, Nb_Bugs_Completed, Nb_PR, Nb_PR_Rejected, Nb_PR_Severe, Nb_PR_Abandoned, Grade) values (${parseInt(EvaluatorID)}, ${parseInt(EvaluatedID)}, ${parseInt(SprintID)}, ${parseInt(Nb_Features_Taken)}, ${parseInt(Nb_Features_Completed)}, ${parseInt(Nb_Bugs_Taken)}, ${parseInt(Nb_Bugs_Completed)}, ${parseInt(Nb_PR)}, ${parseInt(Nb_PRR)}, ${parseInt(Nb_PRS)}, ${parseInt(Nb_PRA)}, ${parseFloat(Grade)});`);
        tempCheck = {Success: "Done"};
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    return(JSON.stringify(tempCheck));
}

async function getDetails(EvaluationID) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    let tempResult = [];
    await poolConnect;
    try {
        const request = pool.request();
        var result = await request.query(`select u.First_Name, u.Last_Name, ed.* from dbo.Evaluation_Details ed, dbo.Users u where ed.Evaluation_ID = ${EvaluationID} AND ed.Supervisor_ID = u.ID;`);
        result.recordset.forEach(result => tempResult.push(result));
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    let tempObj = {
        Details: tempResult
    };
    return JSON.stringify(tempObj);
}

async function getMyPerformance(UserID) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    let tempTotalEvaluations = [];
    let tempPreviousEvaluation = [];
    await poolConnect;
    try {
        const request = pool.request();
        var result = await request.query(`select * from dbo.Evaluations where Evaluated_ID = ${UserID};`);
        result.recordset.forEach(result => tempTotalEvaluations.push(result));
    } catch(err) {
        console.error('SQL error', err);
    }
    try {
        const request = pool.request();
        var result = await request.query(`select u.First_Name, u.Last_Name, e.* from dbo.Evaluations e, dbo.Users u where e.Evaluated_ID = ${UserID} AND e.Sprint_ID = (Select MAX(Sprint_ID) from dbo.Evaluations) AND u.ID = e.Evaluator_ID;`);
        result.recordset.forEach(result => tempPreviousEvaluation.push(result));
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    let tempObj = {
        Evaluations: {
            TotalEvaluations: tempTotalEvaluations,
            PreviousEvaluation: tempPreviousEvaluation
        }
    };
    return JSON.stringify(tempObj);
}

async function incrementEvaluation(EvaluationID, Field) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    await poolConnect;
    try {
        const request = pool.request();
        await request.query(`Update dbo.Evaluations set ${Field} = (${Field} + 1) where ID = ${EvaluationID};`);
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
}

async function changeGrade(EvaluationID, Grade, Decimal) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    await poolConnect;
    try {
        const request = pool.request();
        await request.query(`Update dbo.Evaluations set Grade = (${Grade} + 0.${Decimal}) where ID = ${EvaluationID};`);
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
}

async function getMyEvaluations(EvaluatedID) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    let tempResult = [];
    await poolConnect;
    try {
        const request = pool.request();
        var result = await request.query(`select u.First_Name, u.Last_Name, e.* from dbo.Evaluations e, dbo.Users u where e.Evaluated_ID = ${EvaluatedID} AND e.Evaluator_ID = u.ID;`);
        result.recordset.forEach(result => tempResult.push(result));
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    let tempObj = {
        Evaluations: tempResult
    };
    return JSON.stringify(tempObj);
}

async function getSubordinates(ManagerID) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    let tempResult = [];
    await poolConnect;
    try {
        const request = pool.request();
        var result = await request.query(`select ID, First_Name, Last_Name, Username_Email from dbo.Users where Manager = ${ManagerID};`);
        result.recordset.forEach(result => tempResult.push(result));
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    let tempObj = {
        Subordinates: tempResult
    };
    return JSON.stringify(tempObj);
}

async function getSprints() {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    let tempResult = [];
    await poolConnect;
    try {
        const request = pool.request();
        var result = await request.query(`select * from dbo.Sprints;`);
        result.recordset.forEach(result => tempResult.push(result));
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    let tempObj = {
        Sprints: tempResult
    };
    return JSON.stringify(tempObj);
}

router.get('/', function(req, res) {
    res.send("API is working properly");
});

router.get('/getSprints', async function(req, res) {
    res.send(await getSprints());
});

router.post('/inserEvaluationDetail', async function(req, res) {
    await insertEvaluationDetail(req.body.Detail);
    res.send("Done");
});

router.post('/insertEvaluation', async function(req, res) {
    res.send(await insertEvaluation(req.body.Evaluation));
});

router.post('/changeGrade', async function(req, res) {
    await changeGrade(req.body.Grade.ID, req.body.Grade.param1, req.body.Grade.param2);
    res.send("Done");
});

router.get('/getDetails/:evaluationID', async function(req, res) {
    res.send(await getDetails(req.params.evaluationID));
});

router.get('/getEvaluationsDone/:evaluatorID', async function(req, res) {
    res.send(await getEvaluationsDone(req.params.evaluatorID));
});

router.get('/getMyPerformance/:userID', async function(req, res) {
    res.send(await getMyPerformance(req.params.userID));
});

router.get('/getMyEvaluations/:evaluatedID', async function(req, res) {
    res.send(await getMyEvaluations(req.params.evaluatedID));
});

router.get('/getSubordinates/:managerID', async function(req, res) {
    res.send(await getSubordinates(req.params.managerID));
});

router.get('/checkLogin/:username-:password', async function(req, res) {
    res.send(await checkLogin(req.params.username, req.params.password));
});

router.get('/incrementEvaluation/:evaluationID-:field', async function(req, res) {
    await incrementEvaluation(req.params.evaluationID, req.params.field);
    res.send("Done");
});

module.exports = router;