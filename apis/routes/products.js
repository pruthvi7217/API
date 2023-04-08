const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');



router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error : error
            });
        });
});

router.post('/', (req, res, next) => {
   
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });

    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.findById(id)
        .exec()
        .then(doc => {
            if (doc){
                console.log(doc);
                res.status(200).json(doc);
            }
            else{
                res.status(404).json({
                    message : 'No valid entry found'
                });
            }
        })
        .catch(error => {
            
            res.status(520).json({
                error : error
            });
        });
    
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    // const updateOps = {};
    // for (const ops of req.body){
    //     updateOps[ops.propNmae] = ops.value;
    // }
    
    Product.findOneAndUpdate({_id : id},
        {$set : {name: req.body.name, price : req.body.price}}
        ).exec()
        .then( result => {
            console.log(result);
            res.status(200).json({
                message : 'Updated this object',
                previousObject : result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        });

}); 

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findOneAndRemove({
        _id : id
    }).exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message : 'Deleted the entry having the id',
            DeletedEntry : result
        });
    })
    .catch(error => {
        console.log('new error :',error);
        res.status(500).json({
            error : error
        });
    });
});


module.exports = router;