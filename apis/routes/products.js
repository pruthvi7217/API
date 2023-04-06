const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Get request from products'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Post request from products'
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special'){
        res.status(200).json({
            message: 'Get request for Product ID and you found the special id',
            ProductId: id
        });
    }
    else{
        res.status(200).json({
            message: 'Get request for Product ID',
            ProductId: id
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
    message: 'Get request for Product ID',
    ProductId: id
    });
}); 

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    res.status(201).json({
        message: 'Prodcut Deleted </3',
        ProductId: id
    });
});


module.exports = router;