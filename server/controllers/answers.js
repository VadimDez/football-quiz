/**
 * Created by Vadym Yatsyuk on 20/02/16
 */

import {Router} from 'express'
import Room from '../models/Room'
import Question from './../models/Question'
import Answer from '../models/Answer'
import User from '../models/User'
import mongoose from 'mongoose'

let router = new Router()


function handleError(res) {
  return error => {
    res
      .status(400)
      .end()
  }
}

router.get('/', (req, res) => {
  Answer.findAsync({})
    .then(answers => {
      res
        .status(200)
        .json(answers)
    })
    .call(handleError(res))
})

router.get('/:roomId', (req, res) => {
  Answer.findAsync({room: req.params.roomId})
    .then(answers => {
      res
        .status(200)
        .json(answers)
    })
    .call(handleError(res))
})

router.post('/', (req, res) => {
  Question.findOneAsync({
    _id: mongoose.Types.ObjectId(req.body.id)
  }).then(question => {
    Room.findOneAsync({_id: mongoose.Types.ObjectId(req.body.room)})
      .then(room => {

        User.findOneAsync({
          room: room,
          session: req.sessionID
        }).then(user => {
          Answer.createAsync({
            question: question,
            room: room,
            user: user,
            value: question.answer === req.body.answer
          })
            .then(answer => {
              res
                .status(201)
                .json(answer)
            })
            .catch(handleError(res))
        })
          .catch(handleError(res))
      })
      .catch(handleError(res))
  })
    .catch(handleError(res))
})

export default router