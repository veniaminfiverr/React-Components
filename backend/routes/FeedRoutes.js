const express = require('express');
const { check } = require('express-validator');
const FeedController = require('../controllers/FeedController');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

router.use(checkAuth);

router.post(
    '/:feedTitle',
    [
            check('name').not().isEmpty().isAlphanumeric(),
            check('rating').not().isEmpty().isAlphanumeric(),
            check('feedback').not().isEmpty(),
            check('userId').not().isEmpty()
    ],
    FeedController.saveFeed
);

router.get(
    '/:userId',
    FeedController.findFeed
);

module.exports = router;