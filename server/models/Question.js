/**
 * Created by Vadym Yatsyuk on 20/02/16
 */

"use strict";

let mongoose = require('bluebird').promisifyAll(require('mongoose'))

let QuestionSchema = new mongoose.Schema({
  question: String,
  explanation: String,
  answer: Boolean,
  player: String,
  team: String
})

export default mongoose.model('Question', QuestionSchema)