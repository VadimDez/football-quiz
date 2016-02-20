/**
 * Created by Vadym Yatsyuk on 20/02/16
 */

import {Router} from 'express'

let router = new Router()

router.get('/', (req, res) => {
  res.end()
})

export default router