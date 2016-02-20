/**
 * Created by Vadym Yatsyuk on 20/02/16
 */

import {Router} from 'express'
import Room from './../models/Room'

let router = new Router()

function handleError(res) {
  return error => {
    console.error(error);
    res
      .status(400)
      .end()
  }
}

router.get('/', (req, res) => {
  Room.findAsync({})
    .then(rooms => {
      res.json(rooms);
    })
    .catch(handleError(res))
})

router.post('/', (req, res) => {
  Room.createAsync({
    hash: 1235123,
    created_at: new Date()
  })
    .then(room => {
      res
        .status(200)
        .json(room)
    })
    .catch(handleError(res))
})

router.put('/:id', (req, res) => {
  res.json({id: req.params.id || 0});
})

export default router