/**
 * Created by Vadym Yatsyuk on 20/02/16
 */

"use strict";

let mongoose = require('bluebird').promisifyAll(require('mongoose'))

let UserSchema = new mongoose.Schema({
  username: String,
  session: String,
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  }
})

export default mongoose.model('User', RoomSchema)