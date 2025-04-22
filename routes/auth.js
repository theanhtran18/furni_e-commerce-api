import { Router } from 'express'
import { findUserByEmailOrCreate, loginWithAccount, registerAccount, verifyCode } from '../controllers/auth.js'

const authRouter = Router()

authRouter.post('/auth/google', findUserByEmailOrCreate)
//authRouter.post('/auth/google/refresh', refreshToken)
authRouter.post('/register', registerAccount)
authRouter.post('/verifycode', verifyCode)
authRouter.post('/login', loginWithAccount)
authRouter.post('/code', verifyCode)
authRouter.get('/', (req, res) => {
    return res.json("test")
})
export default authRouter