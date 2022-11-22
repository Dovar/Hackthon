import { Router } from 'Express'

import { tipo } from './tipo'
import { ingresso } from './ingresso'
import { categoria } from './categoria'

export const router : Router = Router()

router.use(tipo)
router.use(ingresso)
router.use(categoria)
