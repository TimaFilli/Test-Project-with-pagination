import { Router } from 'express'
import CT from '../controllers/user.js'

const router = Router()

router.get('/users', CT.GET)
router.post('/users', CT.POST)
router.put('/users/:userId', CT.UPDATE)
router.delete('/users/:userId', CT.DELETE)

export default router