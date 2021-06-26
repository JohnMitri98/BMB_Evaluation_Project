var express = require('express');
var app = express();
var APIRouter = require('./Routes/routes');

const port = process.env.PORT || 5000;
app.set('port', port);

app.use("/API", APIRouter)

app.listen(port, () => console.log(`Listening on Port ${port}`));