/**
 * Created by Vadym Yatsyuk on 20/02/16
 */

import {Router} from 'express'
import Room from './../models/Room'
import User from './../models/User'
import Question from './../models/Question'
import mongoose from 'mongoose'

let router = new Router()

function handleError(res) {
  return (error) => {
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
    hash: req.body.username,
    created_at: new Date(),
    users: []
  })
    .then(room => {

      User.createAsync({
        username: req.body.username,
        session: req.sessionID,
        room: room
      })
        .then(user => {

          Question.aggregateAsync([{
            $sample: { size: 3 }
          }])
            .then(questions => {
              room.users.push(user)
              room.questions = questions

              room.saveAsync()
                .then(() => {
                  res
                    .status(201)
                    .json(room)
                })
                .catch(handleError(res))
            })
            .catch(handleError(res))
        })
        .catch(handleError(res))
    })
    .catch(handleError(res))
})

router.put('/:id', (req, res) => {
  res.json({id: req.params.id || 0});
})

router.post('/join', (req, res) => {
  var roomId = req.body.id;

  Room.findOneAsync({_id: mongoose.Types.ObjectId(roomId)})
    .then(room => {

      if (!room) {
        res.status(404).end()
        return
      }
      User.createAsync({
        username: req.body.username,
        session: req.sessionID,
        room: room
      })
        .then(user => {

          if (user) {
            room.users.push(user)

            room.saveAsync()
              .then(() => {
                res.end();
                return;
              })
              .catch(handleError(res))
          }
        })
        .catch(handleError(res))
    })
    .catch(handleError(res))
})

export default router