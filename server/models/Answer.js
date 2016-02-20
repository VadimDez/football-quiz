/**
 * Created by Vadym Yatsyuk on 20/02/16
 */

"use strict";
let mongoose = require('bluebird').promisifyAll(require('mongoose'))

let AnswerSchema = new mongoose.Schema({
  value: Boolean,
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  }
});

export default mongoose.model('Answer', AnswerSchema)