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
    let tempPassword = null;
    let tempUser = null;
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    await poolConnect;
    try {
        const request = pool.request();
        const result = await request.query(`select * from dbo.Users where Username_Email = \'${Username}\'`);
        tempPassword = (result.recordset[0].Password == Password) + "";
        tempUser = result.recordset[0].First_Name + " " + result.recordset[0].Last_Name;
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    //var JSONObject = JSON.parse({"Correct" : (tempPassword == Password) + "", "Name" : (tempUser + "")});
    console.log(`{"Correct" : "${tempPassword}", "Name" : "${tempUser}"}`);
    return (`{"Correct" : "${tempPassword}", "Name" : "${tempUser}"}`);
}

router.get('/', function(req, res) {
    res.send("API is working properly");
});

router.get('/:method-:param1-:param2', async function(req, res) {
    if(req.params.method = "checkLogin") {
        res.send(await checkLogin(req.params.param1, req.params.param2));
    }
});

module.exports = router;