const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Get request from ORDERS <#%#@$>'
    });
});

router.post('/', (req, res, next) => {
    const order = new Order({
        _id : new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity
    });

    order
        .save()
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            console.log(error)
        }
        );
    res.status(201).json({
        message: 'Handling POST requests to /orders',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    if (id === 'special'){
        res.status(200).json({
            message: 'Get request for ORDER ID and you found the special id',
            ProductId: id
        });
    }
    else{
        res.status(200).json({
            message: 'Get request for ORDER ID',
            ProductId: id
        });
    }
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(201).json({
        message: 'Prodcut Deleted </3',
        ProductId: id
    });
});


module.exports = router;