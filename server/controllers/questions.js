/**
 * Created by Vadym Yatsyuk on 20/02/16
 */

import {Router} from 'express'
import Question from '../models/Question'
import Room from '../models/Room'
import Answer from '../models/Answer'
import mongoose from 'mongoose'

let router = new Router()

function handleError(res) {
  return error => {
    console.error(error);
    res
      .status(400)
      .end()
  }
}

router.get('/:roomId', (req, res) => {
  Room.findOneAsync({_id: mongoose.Types.ObjectId(req.body.id || req.params.roomId)})
    .then(room => {
      Question.findAsync({_id: { $in: room.questions.map(question => {
          return mongoose.Types.ObjectId(question)
        }) }})
        .then(questions => {
            res.json(questions)
        })
        .catch(handleError(res));
    })
    .catch(handleError(res));

})

router.get('/three', (req, res) => {
  Question.aggregateAsync([{
    $sample: { size: 3 }
  }])
    .then(questions => {
      res
        .json(questions)
    })
    .call(handleError(res))
})

export default router