/**
 * Created by Vadym Yatsyuk on 20/02/16
 */

"use strict";

let mongoose = require('bluebird').promisifyAll(require('mongoose'))

let RoomSchema = new mongoose.Schema({
  hash: String,
  created_at: {type: Date},
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }]
})

export default mongoose.model('Room', RoomSchema)