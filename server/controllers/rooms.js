/**
 * Created by Vadym Yatsyuk on 20/02/16
 */

import {Router} from 'express'
import Room from './../models/Room'

let router = new Router()

router.get('/', (req, res) => {
  Room.findAsync({})
    .then(rooms => {
      res.json(rooms);
    })
    .catch(error => {
      res.statusCode(400).end()
    })
})

router.post('/', (req, res) => {
  Room.createAsync({
    hash: 'test'
  })
    .then(room => {
      res.json(room)
    })
    .catch(error => {
      res.statusCode(400).end()
    })
})

export default router