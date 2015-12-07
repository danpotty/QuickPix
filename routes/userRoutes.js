'use strict';
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let User = mongoose.model('User');

module.exports = router;
