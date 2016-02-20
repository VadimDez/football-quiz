/**
 * Created by Vadym Yatsyuk on 20/02/16
 */

import {Router} from 'express'
import Romm from '../models/Room'
import Answer from '../models/Answer'

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
  Answer.createAsync({})
    .then(answer => {
      res
        .status(201)
        .json(answer)
    })
    .call(handleError(res))
})

export default router