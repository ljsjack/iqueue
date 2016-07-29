// Dependencies
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var order = require('../model/orderSchema.js');

// GET the whole database
router.get('/', function(req, res, next) {
    order.find(function (err, api) {
        if (err) return next(err);
        res.json(api);
    });
});

// POST. Create an order.
router.post('/', function(req, res, next) {
    order.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


// GET an individual
router.get('/:id', function(req, res, next) {
    order.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT. Update.
router.put('/:id', function(req, res, next) {
    order.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
    order.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});



module.exports = router;