var express = require("express");
var router = express.Router();
var sql = require('mssql');
const {Encrypt} = require('../Encryption/Encryptor');
const {Decrypt} = require('../Encryption/Decryptor');

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
        var result = await request.query(`select * from dbo.Users where Username_Email = \'${Decrypt(Username)}\';`);
        if(result.recordset[0]) {
            tempCorrect = (result.recordset[0].Password == Decrypt(Password)) + "";
            tempUser = result.recordset[0].First_Name + " " + result.recordset[0].Last_Name;
            tempUserID = result.recordset[0].ID + "";
            roleID = result.recordset[0].Roles_ID;
        }
        if(roleID) {
            result = await request.query(`select * from dbo.Roles where ID = \'${roleID}\';`);
            if(result.recordset[0]) {
                roles = result.recordset[0];
                for(const [key, value] of Object.entries(roles)) {
                    roles[key] = Encrypt(value);
                }
            }
        }
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    let tempObj = {
        Correct: Encrypt(tempCorrect + ""),
        Name: Encrypt(tempUser),
        UserID: Encrypt(tempUserID + ""),
        Roles: roles
    };
    return JSON.stringify(tempObj);
}

async function getEvaluationsDone(Evaluator, Admin, SprintID) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    let tempResult = [];
    await poolConnect;
    try {
        const request = pool.request();
        if(Decrypt(Admin) === "true") {
            var result = await request.query(`select u1.First_Name as Evaluator_First_Name, u1.Last_Name as Evaluator_Last_Name, u2.First_Name as Evaluated_First_Name, u2.Last_Name as Evaluated_Last_Name, e.*, s.Start_Date from dbo.Evaluations e, dbo.Users u1, dbo.Users u2, dbo.Sprints s where e.Evaluator_ID = u1.ID AND e.Evaluated_ID = u2.ID AND e.Sprint_ID = s.ID AND e.Sprint_ID = ${Decrypt(SprintID)} order by s.Start_Date;`);
            result.recordset.forEach(result => {
                for(const [key, value] of Object.entries(result)) {
                    result[key] = Encrypt(value);
                }
                tempResult.push(result);
            });
        } else {
            let allUserIDs = await getManagerSubordinateIDs(Decrypt(Evaluator));
            allUserIDs = allUserIDs.userIDs;
            allUserIDs = allUserIDs.map((userID) => {return parseInt(Decrypt(userID))});
            for(const userID of allUserIDs) {
                var result = await request.query(`select u1.First_Name as Evaluator_First_Name, u1.Last_Name as Evaluator_Last_Name, u2.First_Name as Evaluated_First_Name, u2.Last_Name as Evaluated_Last_Name, e.*, s.Start_Date from dbo.Evaluations e, dbo.Users u1, dbo.Users u2, dbo.Sprints s where e.Evaluator_ID = ${userID} AND e.Evaluator_ID = u1.ID AND e.Evaluated_ID = u2.ID AND e.Sprint_ID = s.ID AND e.Sprint_ID = ${Decrypt(SprintID)} order by s.Start_Date;`);
                result.recordset.forEach(result => {
                    for(const [key, value] of Object.entries(result)) {
                        result[key] = Encrypt(value);
                    }
                    tempResult.push(result);
                });
            }
            /*await allUserIDs.forEach(userID => async function(userID) {
                console.log("Test");
                //console.log(userID, " ", Decrypt(SprintID));
                var result = request.query(`select u.First_Name, u.Last_Name, e.*, s.Start_Date from dbo.Evaluations e, dbo.Users u, dbo.Sprints s where e.Evaluator_ID = ${userID} AND e.Evaluated_ID = u.ID AND e.Sprint_ID = s.ID AND e.Sprint_ID = ${Decrypt(SprintID)} order by s.Start_Date;`);
                result.recordset.forEach(result => {
                    for(const [key, value] of Object.entries(result)) {
                        result[key] = Encrypt(value);
                    }
                    tempResult.push(result);
                });
            });*/
        }
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    let tempObj = {
        Evaluations: tempResult
    };
    return JSON.stringify(tempObj);
}

async function getSprintEvaluationsDone(Evaluator, Admin) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    let tempResult = [];
    await poolConnect;
    try {
        const request = pool.request();
        if(Decrypt(Admin) === "true") {
            var result = await request.query(`select s.ID, s.Name, s.Start_Date, Count(e.ID) as Total_Evaluations from dbo.Evaluations e, dbo.Sprints s where e.Sprint_ID = s.ID group by Start_Date, s.ID, s.Name order by Start_Date Desc;`);
            result.recordset.forEach(result => {
                for(const [key, value] of Object.entries(result)) {
                    result[key] = Encrypt(value);
                }
                tempResult.push(result);
            });
        } else {
            let allUserIDs = await getManagerSubordinateIDs(Decrypt(Evaluator));
            allUserIDs = allUserIDs.userIDs;
            allUserIDs = allUserIDs.map((userID) => {return parseInt(Decrypt(userID))});
            for(const userID of allUserIDs) {
                var result = await request.query(`select s.ID, s.Name, s.Start_Date, Count(e.ID) as Total_Evaluations from dbo.Evaluations e, dbo.Sprints s where e.Sprint_ID = s.ID AND e.Evaluator_ID = ${userID} group by Start_Date, s.ID, s.Name order by Start_Date Desc;`);
                result.recordset.forEach(result => {
                    for(const [key, value] of Object.entries(result)) {
                        result[key] = Encrypt(value);
                    }
                    tempResult.push(result);
                });
            }
        }
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    let tempObj = {
        SprintEvaluations: tempResult
    };
    return JSON.stringify(tempObj);
}

async function insertEvaluationDetail(Detail) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    await poolConnect;
    try {
        const request = pool.request();
        await request.query(`Insert into dbo.Evaluation_Details (Evaluation_ID, Supervisor_ID, Status, Type, Severity, Description, Link) values (${parseInt(Decrypt(Detail.EvaluationID))}, ${parseInt(Decrypt(Detail.SupervisorID))}, '${Decrypt(Detail.Status)}', '${Decrypt(Detail.Type)}', ${parseInt(Decrypt(Detail.Severity))}, ${(Decrypt(Detail.Description) === "") ? null : `'${Decrypt(Detail.Description)}'`}, '${Decrypt(Detail.Link)}');`);
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
}

async function insertEvaluation(Evaluation) {
    let {EvaluatorID, EvaluatedID, SprintID, Nb_Features_Taken, Nb_Features_Completed, Nb_Bugs_Taken, Nb_Bugs_Completed, Nb_PR, Nb_PRR, Nb_PRS, Nb_PRA, Grade} = Evaluation;
    const pool = new sql.ConnectionPool(sqlConfig);
    let tempCheck = {Success: Encrypt("Failed")};
    const poolConnect = pool.connect();
    await poolConnect;
    try {
        const request = pool.request();
        await request.query(`Insert into dbo.Evaluations (Evaluator_ID, Evaluated_ID, Sprint_ID, Nb_Features_Taken, Nb_Features_Completed, Nb_Bugs_Taken, Nb_Bugs_Completed, Nb_PR, Nb_PR_Rejected, Nb_PR_Severe, Nb_PR_Abandoned, Grade) values (${parseInt(Decrypt(EvaluatorID))}, ${parseInt(Decrypt(EvaluatedID))}, ${parseInt(Decrypt(SprintID))}, ${parseInt(Decrypt(Nb_Features_Taken))}, ${parseInt(Decrypt(Nb_Features_Completed))}, ${parseInt(Decrypt(Nb_Bugs_Taken))}, ${parseInt(Decrypt(Nb_Bugs_Completed))}, ${parseInt(Decrypt(Nb_PR))}, ${parseInt(Decrypt(Nb_PRR))}, ${parseInt(Decrypt(Nb_PRS))}, ${parseInt(Decrypt(Nb_PRA))}, ${parseFloat(Decrypt(Grade))});`);
        tempCheck = {Success: Encrypt("Done")};
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
        var result = await request.query(`select u.First_Name, u.Last_Name, ed.* from dbo.Evaluation_Details ed, dbo.Users u where ed.Evaluation_ID = ${Decrypt(EvaluationID)} AND ed.Supervisor_ID = u.ID;`);
        result.recordset.forEach(result => {
            for(const [key, value] of Object.entries(result)) {
                result[key] = ((value || parseInt(value) === 0) ? Encrypt(value) : Encrypt(""));
            }
            tempResult.push(result);
        });
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
        var result = await request.query(`select e.*, s.Start_Date from dbo.Evaluations e, dbo.Sprints s where e.Evaluated_ID = ${Decrypt(UserID)} AND e.Sprint_ID = s.ID;`);
        result.recordset.forEach(result => {
            for(const [key, value] of Object.entries(result)) {
                result[key] = Encrypt(value);
            }
            tempTotalEvaluations.push(result);
        });
    } catch(err) {
        console.error('SQL error', err);
    }
    try {
        const request = pool.request();
        var result = await request.query(`select u.First_Name, u.Last_Name, e.*, s.Start_Date, s.Name from dbo.Evaluations e, dbo.Users u, dbo.Sprints s where e.Evaluated_ID = ${Decrypt(UserID)} AND e.Sprint_ID = (Select Max(a.SprintID) from (Select s.ID as SprintID, s.Start_Date, e.* from dbo.Sprints s, dbo.Evaluations e where e.Sprint_ID = s.ID) a where a.Start_Date = (Select Max(b.Start_Date) from (Select s.ID as SprintID, s.Start_Date, e.* from dbo.Sprints s, dbo.Evaluations e where e.Sprint_ID = s.ID AND e.Evaluated_ID = ${Decrypt(UserID)}) b)) AND u.ID = e.Evaluator_ID AND e.Sprint_ID = s.ID;`);
        result.recordset.forEach(result => {
            for(const [key, value] of Object.entries(result)) {
                result[key] = Encrypt(value);
            }
            tempPreviousEvaluation.push(result);
        });
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
        await request.query(`Update dbo.Evaluations set ${Decrypt(Field)} = (${Decrypt(Field)} + 1) where ID = ${Decrypt(EvaluationID)};`);
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
}

async function decrementEvaluation(EvaluationID, Field) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    await poolConnect;
    try {
        const request = pool.request();
        await request.query(`Update dbo.Evaluations set ${Decrypt(Field)} = (${Decrypt(Field)} - 1) where ID = ${Decrypt(EvaluationID)};`);
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
        await request.query(`Update dbo.Evaluations set Grade = (${Decrypt(Grade)} + 0.${Decrypt(Decimal)}) where ID = ${Decrypt(EvaluationID)};`);
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
        var result = await request.query(`select u.First_Name, u.Last_Name, e.*, s.Start_Date, s.Name from dbo.Evaluations e, dbo.Users u, dbo.Sprints s where e.Evaluated_ID = ${Decrypt(EvaluatedID)} AND e.Evaluator_ID = u.ID AND e.Sprint_ID = s.ID order by Start_Date;`);
        result.recordset.forEach(result => {
            for(const [key, value] of Object.entries(result)) {
                result[key] = Encrypt(value);
            }
            tempResult.push(result);
        });
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    let tempObj = {
        Evaluations: tempResult
    };
    return JSON.stringify(tempObj);
}

async function getSubordinates(ManagerID, Admin) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    let tempResult = [];
    await poolConnect;
    try {
        const request = pool.request();
        if(Decrypt(Admin) === "true") {
            var result = await request.query(`select ID, First_Name, Last_Name from dbo.Users;`);
        } else {
            var result = await request.query(`select ID, First_Name, Last_Name from dbo.Users where Manager = ${Decrypt(ManagerID)};`);
        }
        result.recordset.forEach(result => {
            for(const [key, value] of Object.entries(result)) {
                result[key] = Encrypt(value);
            }
            tempResult.push(result)
        });
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
        var result = await request.query(`select * from dbo.Sprints Order By Start_Date;`);
        result.recordset.forEach(result => {
            for(const [key, value] of Object.entries(result)) {
                result[key] = Encrypt(value);
            }
            tempResult.push(result);
        });
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    let tempObj = {
        Sprints: tempResult
    };
    return JSON.stringify(tempObj);
}

async function insertUser(User) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    await poolConnect;
    try {
        const request = pool.request();
        await request.query(`Insert into dbo.Users (First_Name, Last_Name, Username_Email, Password, Manager, Specialty, Position, Roles_ID) values ('${Decrypt(User.First_Name)}', '${Decrypt(User.Last_Name)}', ${Decrypt(User.Username_Email) !== "" ? `'${Decrypt(User.Username_Email)}'` : null}, ${Decrypt(User.Password) !== "" ? `'${Decrypt(User.Password)}'` : null}, ${Decrypt(User.Manager) !== "" ? parseInt(Decrypt(User.Manager)) : null}, ${Decrypt(User.Specialty) !== "" ? `'${Decrypt(User.Specialty)}'` : null}, ${Decrypt(User.Position) !== "" ? `'${Decrypt(User.Position)}'` : null}, ${Decrypt(User.Roles_ID) !== "" ? parseInt(Decrypt(User.Roles_ID)) : null});`);
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
}

async function getUsers() {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    let tempResult = [];
    await poolConnect;
    try {
        const request = pool.request();
        var result = await request.query(`select * from dbo.Users;`);
        result.recordset.forEach(result => {
            for(const [key, value] of Object.entries(result)) {
                result[key] = Encrypt(value ? value : "");
            }
            tempResult.push(result);
        });
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    let tempObj = {
        Users: tempResult
    };
    return tempObj;
}

async function insertSprint(Sprint) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    await poolConnect;
    try {
        const request = pool.request();
        await request.query(`Insert into dbo.Sprints (Name, Start_Date, End_Date) values ('${Decrypt(Sprint.Name)}', '${new Date(Decrypt(Sprint.StartDate)).getFullYear()}-${new Date(Decrypt(Sprint.StartDate)).getMonth()}-${new Date(Decrypt(Sprint.StartDate)).getDate()}', '${new Date(Decrypt(Sprint.EndDate)).getFullYear()}-${new Date(Decrypt(Sprint.EndDate)).getMonth() + 1}-${new Date(Decrypt(Sprint.EndDate)).getDate()}');`);
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
}

async function getColumnNames(Name) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    let tempResult = [];
    await poolConnect;
    try {
        const request = pool.request();
        var result = await request.query(`select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '${Decrypt(Name)}' Order By ORDINAL_POSITION;`);
        result.recordset.forEach(result => {
            for(const [key, value] of Object.entries(result)) {
                result[key] = Encrypt(value);
            }
            tempResult.push(result);
        });
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    let tempObj = {
        Columns: tempResult
    };
    return JSON.stringify(tempObj);
}

async function getRoles() {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    let tempResult = [];
    await poolConnect;
    try {
        const request = pool.request();
        var result = await request.query(`select * from dbo.Roles;`);
        result.recordset.forEach(result => {
            for(const [key, value] of Object.entries(result)) {
                result[key] = Encrypt(value);
            }
            tempResult.push(result);
        });
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    let tempObj = {
        Roles: tempResult
    };
    return JSON.stringify(tempObj);
}

async function switchRoleView(RoleID, Column) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    await poolConnect;
    try {
        const request = pool.request();
        await request.query(`Update dbo.Roles set ${Decrypt(Column)} = ~${Decrypt(Column)} where ID = ${Decrypt(RoleID)};`);
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
}

async function insertRole(RoleName) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    await poolConnect;
    try {
        const request = pool.request();
        await request.query(`Insert into dbo.Roles (Name) values ('${Decrypt(RoleName)}');`);
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
}

async function insertRoleColumn(ColumnName) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    await poolConnect;
    try {
        const request = pool.request();
        await request.query(`ALTER TABLE dbo.Roles ADD ${Decrypt(ColumnName)} Bit NOT NULL CONSTRAINT ${Decrypt(ColumnName)}_Default DEFAULT 0;`);
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
}

async function updateEvaluation(Change, Grade, Field, EvaluationID) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    await poolConnect;
    try {
        const request = pool.request();
        await request.query(`Update dbo.Evaluations set ${Decrypt(Field) + ""} = ${Decrypt(Change)}, Grade = ${Decrypt(Grade)} where ID = ${Decrypt(EvaluationID)};`);
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
}

async function updateUser(Change, Field, UserID) {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    await poolConnect;
    try {
        const request = pool.request();
        await request.query(`Update dbo.Users set ${Decrypt(Field) + ""} = ${(Decrypt(Change) !== "") ? Decrypt(Change) : "NULL"} where ID = ${Decrypt(UserID)};`);
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
}

async function getLastSprint() {
    const pool = new sql.ConnectionPool(sqlConfig);
    const poolConnect = pool.connect();
    let tempResult = {};
    await poolConnect;
    try {
        const request = pool.request();
        var result = await request.query(`Select Start_Date, End_Date from dbo.Sprints order by Start_Date Desc;`)
        //tempResult.Start_Date = Encrypt(result.recordset[0].Start_Date);
        tempResult = {
            Start_Date: Encrypt(result.recordset[0].Start_Date),
            End_Date: Encrypt(result.recordset[0].End_Date)
        };
    } catch(err) {
        console.error('SQL error', err);
    }
    pool.close();
    return JSON.stringify(tempResult);
}

async function getManagerSubordinateIDs(ManagerID) {
    let allUsers = await getUsers();
    allUsers = allUsers.Users;
    await allUsers.forEach(user => {
        for(const [key, value] of Object.entries(user)) {
            user[key] = Decrypt(value);
        }
    });
    let searchIDs = [parseInt(ManagerID)];
    let tempResult = await recursiveSubordinateSearch(ManagerID, allUsers);
    tempResult.forEach(userID => {
        searchIDs.push(parseInt(userID));
    });
    let tempObj = {
        userIDs: searchIDs.map((userID) => {return (Encrypt(userID))})
    };
    console.log("IDs: ", tempObj);
    return tempObj;
}

function recursiveSubordinateSearch(UserID, UserArray) {
    let tempUserArray = [];
    UserArray.forEach(user => {
        if(user.Manager == UserID) {
            UserArray.forEach(tempUser => {
                if(tempUser.Manager == user.ID) {
                    tempUserArray.push(user.ID);
                    let tempResult = recursiveSubordinateSearch(user.ID, UserArray);
                    tempResult.forEach(userID => {
                        tempUserArray.push(userID);
                    });
                }
            });
        }
    });
    return tempUserArray;
}

router.get('/', function(req, res) {
    res.send("API is working properly");
});

router.get('/getSprints', async function(req, res) {
    res.send(await getSprints());
});

router.post('/insertEvaluationDetail', async function(req, res) {
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

router.search('/getDetails', async function(req, res) {
    res.send(await getDetails(req.body.EvaluationID));
});

router.search('/getEvaluationsDone', async function(req, res) {
    res.send(await getEvaluationsDone(req.body.UserID, req.body.Admin, req.body.SprintID));
});

router.search('/getSprintEvaluationsDone', async function(req, res) {
    res.send(await getSprintEvaluationsDone(req.body.UserID, req.body.Admin));
});

router.search('/getMyPerformance', async function(req, res) {
    res.send(await getMyPerformance(req.body.UserID));
});

router.search('/getMyEvaluations', async function(req, res) {
    res.send(await getMyEvaluations(req.body.EvaluatedID));
});

router.search('/getSubordinates', async function(req, res) {
    res.send(await getSubordinates(req.body.ManagerID, req.body.Admin));
});

router.search('/checkLogin', async function(req, res) {
    res.send(await checkLogin(req.body.Username, req.body.Password));
});

router.post('/incrementEvaluation', async function(req, res) {
    await incrementEvaluation(req.body.EvaluationID, req.body.Field);
    res.send("Done");
});

router.post('/decrementEvaluation', async function(req, res) {
    await decrementEvaluation(req.body.EvaluationID, req.body.Field);
    res.send("Done");
});

router.post('/insertUser', async function(req, res) {
    await insertUser(req.body.User);
    res.send("Done");
});

router.get('/getUsers', async function(req, res) {
    let users = await getUsers();
    res.send(await JSON.stringify(users));
});

router.post('/insertSprint', async function(req, res) {
    await insertSprint(req.body.Sprint);
    res.send("Done");
});

router.search('/getColumnNames', async function(req, res) {
    res.send(await getColumnNames(req.body.Table));
});

router.get('/getRoles', async function(req, res) {
    res.send(await getRoles());
});

router.search('/switchRoleView', async function(req, res) {
    await switchRoleView(req.body.RoleID, req.body.Column);
    res.send("Done");
});

router.post('/insertRole', async function(req, res) {
    await insertRole(req.body.RoleName);
    res.send("Done");
});

router.post('/insertRoleColumn', async function(req, res) {
    await insertRoleColumn(req.body.ColumnName);
    res.send("Done");
});

router.post('/updateEvaluation', async function(req, res) {
    await updateEvaluation(req.body.Change, req.body.Grade, req.body.Field, req.body.EvaluationID);
    res.send("Done");
});

router.post('/updateUser', async function(req, res) {
    await updateUser(req.body.Change, req.body.Field, req.body.UserID);
    res.send("Done");
});

router.get('/getLastSprint', async function(req, res) {
    res.send(await getLastSprint());
});

router.search('/getManagerSubordinateIDs', async function(req, res) {
    res.send(await JSON.stringify(getManagerSubordinateIDs(req.body.ManagerID)));
});

module.exports = router;