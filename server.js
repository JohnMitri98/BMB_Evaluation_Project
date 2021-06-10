const sql = require('mssql');

const Username = "JMitri";

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

try {
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
}