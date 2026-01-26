const express = require('express');
const app = express();
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const port = process.env.PORT || 3000;

//Route for swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Middleware that parses json
app.use(bodyParser.json());

//Avoiding crosss origin issues
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-key"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

//Making routes usable
app.use('/', require('./routes'));

//Easiest way to handle errors
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught excession: ${err}\n`+`Exception origin: ${origin}`);
});

//shows mongodb is running
mongodb.initDb((err) => {
    if(err){
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Database is running and node is running on port ${port}`)});
    }
});