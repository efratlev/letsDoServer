"use strict";
const Group = require('../models/group.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userName: { type: String, unique: true },
    firstName: String,
    lastName: String,
    password: String,
    groups: [
        {
            groupId: {
                type: Schema.ObjectId,
                ref: 'group'
            },
            authorizationId: {
                type: Schema.ObjectId,
                ref: 'authorization'
            }
        }
    ],
    img: [String],
    email:[String]
});

module.exports = mongoose.model('user', schema);