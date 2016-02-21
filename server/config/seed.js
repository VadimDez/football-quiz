/**
 * Created by Vadym Yatsyuk on 20/02/16
 */

import Question from './../models/Question'
import questions from './seedQuestions'

export default function () {
  //return; // do not seed for now

  Question.find({})
    .removeAsync()
    .then(() => {
      questions.forEach(question => {
        Question.createAsync(question)
      })
    })
}