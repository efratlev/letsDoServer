"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    businessName: { type: String },
    description: { type: String },
    address: { type: String }
});


module.exports = mongoose.model('business', schema);