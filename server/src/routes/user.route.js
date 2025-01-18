import express from "express"
import { login, logout, register, verifyOtpLogin, verifyOtpRegister } from "../controllers/user.controller.js"
import { verifyJwt } from "../middleware/auth.middleware.js"

const router = express.Router()

router.route('/register').post(register)

router.route('/verifyOtpRegister').post(verifyOtpRegister)

router.route('/login').post(login)

router.route('/verifyOtpLogin').post(verifyOtpLogin)

router.route('/logout').post(verifyJwt, logout)

export default router