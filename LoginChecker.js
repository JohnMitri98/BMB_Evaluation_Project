export default class LoginChecker {

    constructor() {

        this.pool = null;
        this.poolConnection = null;
        /*this.state = {
            sql: null,
            sqlConfig: null,
            pool: null,
            pooConnection: null
        };*/

        //this.checkCredentials = this.CheckCredentials.bind(this);
    }
    
    setup() {
        const sql = require('mssql');

        //const Username = "JMitri";

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

        const pool1 = new sql.ConnectionPool(sqlConfig);
        const pool1Connect = pool1.connect();
        pool1.on('error', err =>{

        });

        this.pool = pool1;
        this.poolConnection = pool1Connect;

        /*this.setState({
            pool: pool1,
            ConnectionPool: pool1Connect
        })*/
    };

    async checkCredentials(Username, Password) {
        //let sql = this.state.sql;
        var tempPassword = "";
        /*try {
            // make sure that any items are correctly URL encoded in the connection string
            this.state.sql.connect(this.state.sqlConfig, function (err) {
                while(this.state.sql.connection == null) {};
                if (err) console.log(err);

                const ps = new sql.PreparedStatement();
        
                ps.input('Username', sql.VarChar);
        
                // create Request object
                var request = new sql.Request();
                    
                // query to the database and get the records
                request.query('Use project;');
        
                ps.prepare(`select * from dbo.Users where Username_Email = @Username`, err => {
                    ps.execute({Username: Username}, (err, result) => {
                        tempPassword = result.recordset[0].password;
                        ps.unprepare(err => {});
                    });
                });
            });
            return (tempPassword == Password);
        } catch (err) {
            // ... error checks
            console.dir(err);
        }*/

        await this.poolConnection;
        try {
            const request = this.pool.request();
            const result = await request.query(`select * from dbo.Users where Username_Email = ${Username}`);
            if(result.size() > 0) {
                tempPassword = result.recordset[0].password;
                return (tempPassword == Password);
            } else {
                return false;
            }
        } catch (err) {
            console.dir(err);
        }

    };

}