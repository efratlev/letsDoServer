"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    groupName: {
        type: String,
        unique: true
    },
    tasks: [{
        type: Schema.ObjectId,
        ref: 'task',
        default: []
    }]
});


module.exports = mongoose.model('group', schema);