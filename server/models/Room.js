/**
 * Created by Vadym Yatsyuk on 20/02/16
 */

"use strict";

let mongoose = require('bluebird').promisifyAll(require('mongoose'))

let RoomSchema = new mongoose.Schema({
  hash: String
})

export default mongoose.model('Room', RoomSchema)