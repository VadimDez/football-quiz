/**
 * Created by Vadym Yatsyuk on 20/02/16
 */

import Question from './../models/Question'
import questions from './seedQuestions'

export default function () {
  Question.find({})
    .removeAsync()
    .then(() => {
      questions.forEach(question => {
        Question.createAsync(question)
      })
    })
}