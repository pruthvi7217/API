const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Get request from ORDERS <#%#@$>'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Post request from ORDERS <#%#@$>'
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