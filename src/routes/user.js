import { Router } from 'express'
import validation from '../middlewares/validation.js'
import checkToken from '../middlewares/checkToken.js'
import CT from '../controllers/user.js'

const router = Router()

router.post('/register', validation, CT.POST_REGISTER)
router.post('/login', validation, CT.POST_LOGIN)

router.get('/users', checkToken, validation, CT.GET_USERS)
router.get('/user/:userId', checkToken, CT.GET_USER)

// router.put('/users/:userId', CT.UPDATE)
// router.delete('/users/:userId', CT.DELETE)

export default router