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
        var result = await request.query(`select * from dbo.Users where Username_Email = \'${Username}\'`);
        if(result.recordset[0]) {
            tempCorrect = (result.recordset[0].Password == Password) + "";
            tempUser = result.recordset[0].First_Name + " " + result.recordset[0].Last_Name;
            tempUserID = result.recordset[0].ID + "";
            roleID = result.recordset[0].Roles_ID;
        }
        if(roleID) {
            result = await request.query(`select * from dbo.Roles where ID = \'${roleID}\'`);
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
        var result = await request.query(`select u.First_Name, u.Last_Name, e.* from dbo.Evaluations e, dbo.Users u where e.Evaluator_ID = ${Evaluator} AND e.Evaluated_ID = u.ID`);
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
        await request.query(`Insert into dbo.Evaluation_Details (Evaluation_ID, Supervisor_ID, Status, Type, Severity, Description, Link) values (${parseInt(Detail.EvaluationID)}, ${parseInt(Detail.SupervisorID)}, '${Detail.Status}', '${Detail.Type}', ${parseInt(Detail.Severity)}, '${Detail.Description}', '${Detail.Link}')`);
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
}

router.get('/', function(req, res) {
    res.send("API is working properly");
});

router.get('/:method-:param1-:param2', async function(req, res) {
    if(req.params.method = "checkLogin") {
        res.send(await checkLogin(req.params.param1, req.params.param2));
    }
});
router.get('/:method-:Evaluator', async function(req, res) {
    if(req.params.method = "getEvaluationsDone") {
        res.send(await getEvaluationsDone(req.params.Evaluator));
    }
});
router.post('/:method', jsonParser, async function(req, res) {
    if(req.params.method = "insertEvaluationDetail") {
        await insertEvaluationDetail(req.body.Detail);
    }
});

module.exports = router;