"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    taskName: { type: String },
    description: { type: String },
    dateCreated: { type: Date },
    targetDate: { type: Date },
    assignedTo: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    addedBy: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    priority: { type: String },
    frequency: { type: String },
    status: { type: String },
    comments: { type: String },
    businessName: {
        type: Schema.ObjectId,
        ref: 'business'
    }
});

module.exports = mongoose.model('task', schema);