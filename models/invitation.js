"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    invitedBy: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    groupId: {
        type: Schema.ObjectId,
        ref: 'group'
    }
});


module.exports = mongoose.model('invitation', schema);