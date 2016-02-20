/**
 * Created by Vadym Yatsyuk on 20/02/16
 */

import {Router} from 'express'
import Question from '../models/Question'
import Romm from '../models/Room'
import Answer from '../models/Answer'

let router = new Router()

router.get('/', (req, res) => {
  res.json([
    {
      question: 'true?!',
      answer: true
    }
  ])
})

export default router