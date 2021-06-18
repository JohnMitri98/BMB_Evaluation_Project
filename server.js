var express = require('express');
var app = express();
var APIRouter = require('./Routes/Routes');

const port = process.env.PORT || 5000;
app.set('port', port);

app.use("/API", APIRouter)

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.listen(port, () => console.log(`Listening on Port ${port}`));