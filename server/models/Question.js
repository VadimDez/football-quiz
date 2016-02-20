/**
 * Created by Vadym Yatsyuk on 20/02/16
 */

"use strict";

let mongoose = require('bluebird').promisifyAll(require('mongoose'))

let QuestionSchema = new mongoose.Schema({
  text: String,
  answer: Boolean
})

export default mongoose.model('Question', QuestionSchema)