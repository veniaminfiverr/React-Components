const express = require('express');
const { check } = require('express-validator');
const productController = require('../controllers/ProductController');

const router = express.Router();

router.get('/:title', productController.getProductByTitle);
router.get('/', productController.getProducts);

router.post(
    '/',
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 1 })
    ],
    productController.createProduct
);

module.exports = router;