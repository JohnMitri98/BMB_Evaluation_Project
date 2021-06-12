var express = require('express');
//var bodyParser = require('body-parser');
var sql = require('mssql');
//var cors = require('cors');
var app = express();
var testAPIRouter = require('./routes/test');

const port = process.env.PORT || 5000;
app.set('port', port);

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

app.use("/testAPI", testAPIRouter)
//app.use(bodyParser.json());
//app.use(cors());

/*try {
    // make sure that any items are correctly URL encoded in the connection string
    sql.connect(sqlConfig, function (err) {
        if (err) console.log(err);

        console.dir('Yo');

        const ps = new sql.PreparedStatement();

        ps.input('Username', sql.VarChar);

        // create Request object
        var request = new sql.Request();
            
        // query to the database and get the records
        request.query('Use project;');

        ps.prepare(`select * from dbo.Users where Username_Email = @Username`, err => {
            ps.execute({Username: 'JMitri'}, (err, result) => {
                console.dir(result.recordset[0].First_Name);
                ps.unprepare(err => {});
            });
        });
    });
} catch (err) {
    // ... error checks
    console.dir(err);
}*/

app.listen(port, () => console.log(`Listening on Port ${port}`));

/*app.get('/express_backend', (req, res) => {
  res.send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});*/

/*app.listen(port, function() {
  
});*/

function checkLogin(Username, Password) {
  var tempPassword = null;
  var dbConn = new sql.Connection(sqlConfig);
  dbConn.connect().then(function() {
    var request = new sql.Request(dbConn);
    request.query(`select * from dbo.Users where Username_Email = ${Username}`).then(function(resp) {
      tempPassword = resp.recordset[0].Password;
      dbConn.close();
    }).catch(function(err) {
      console.log(err);
    });
  }).catch(function(err) {
    console.log(err);
  });
  return (tempPassword == Password);
}