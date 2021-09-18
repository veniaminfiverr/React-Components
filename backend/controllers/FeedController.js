const { validationResult } = require('express-validator');
const HttpError = require("../models/http-error");
const Feed = require('../models/Feed');
const jwt = require("jsonwebtoken");

const saveFeed = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }
    let createdFeed;
    const feedTitle = req.params.feedTitle;
    let foundFeed = await Feed.find({'name':feedTitle,'userId':req.body.userId});
    if(null != foundFeed && foundFeed.length > 0) {
        foundFeed[0].rating = req.body.rating;
        foundFeed[0].feedback = req.body.feedback;
        createdFeed = foundFeed[0];
    } else {
        createdFeed = new Feed({
            name: feedTitle,
            rating: req.body.rating,
            feedback: req.body.feedback,
            userId: req.body.userId
        });
    }
    const result = await createdFeed.save();
    res.json(result);
}

const findFeed = async (req, res, next) => {
    const userId = req.params.userId;
    let feeds = await Feed.find({'userId':userId});
    res.json(feeds);
}

exports.saveFeed = saveFeed;
exports.findFeed = findFeed;