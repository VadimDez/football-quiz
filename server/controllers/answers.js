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
      .statusCode(400)
      .end()
  }
}

router.get('/', (req, res) => {
  Answer.findAsync({})
    .then(answers => {
      res
        .statusCode(200)
        .json(answers)
    })
    .catch(handleError)
})

router.get('/:roomId', (req, res) => {
  Answer.findAsync({room: req.params.roomId})
    .then(answers => {
      res
        .statusCode(200)
        .json(answers)
    })
    .catch(handleError)
})

router.post('/', (req, res) => {
  req.end()
})

export default router