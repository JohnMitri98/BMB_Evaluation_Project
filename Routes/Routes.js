var express = require("express");
var router = express.Router();
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
    let tempReturn = `{"Correct" : "${tempCorrect + ""}", "Name" : "${tempUser}", "UserID" : "${tempUserID + ""}", "Roles" : {`;
    if(roles) {
        for([key, value] of Object.entries(roles)) {
            tempReturn += `"${key}" : "${value}", `;
        }
        tempReturn = tempReturn.substring(0, (tempReturn.length - 2));
    }
    tempReturn += `}}`;
    return (tempReturn);
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
    let tempReturn = `{"Evaluations" : [`;
    tempResult.forEach(result => {
        tempReturn += "{";
        for([key, value] of Object.entries(result)) {
            tempReturn += `"${key}" : "${value}", `;
        }
        tempReturn = tempReturn.substring(0, (tempReturn.length - 2));
        tempReturn += "}, "
    })
    tempReturn = tempReturn.substring(0, (tempReturn.length - 2));
    tempReturn += `]}`;
    return (tempReturn);

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

module.exports = router;