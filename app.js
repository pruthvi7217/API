const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./apis/routes/products');
const orderRoutes = require('./apis/routes/orders')
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
mongoose.connect(
    'mongodb+srv://pruthvi7217:' + 
    process.env.MONGO_ATLAS_PWD + 
    '@project.ypng1qi.mongodb.net/?retryWrites=true&w=majority');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method == 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
        return res.status(200).json({});
    }
    next(); 
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error : {
            message : error.message
        }
    });
});

module.exports = app;