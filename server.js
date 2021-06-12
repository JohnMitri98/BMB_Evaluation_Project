var express = require('express');
var app = express();
var testAPIRouter = require('./routes/test');

const port = process.env.PORT || 5000;
app.set('port', port);

app.use("/testAPI", testAPIRouter)

app.listen(port, () => console.log(`Listening on Port ${port}`));