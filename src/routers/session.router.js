import { Router } from "express";
import passport from "passport";
import nodemailer from 'nodemailer'
import { registerController, failRegisterController, loginController, failLoginController, logoutController, githubController, githubCallBackController } from "../controllers/session.controller.js";
import config from '../config/config.js';
import UserModel from '../dao/models/user.model.js'
import UserPasswordModel from '../dao/models/user_password.model.js'
import { generateRandomString, crateHash } from '../utils.js';
import { PORT } from '../app.js';

const router = Router()


router.post('/register', passport.authenticate('register', {failureRedirect: '/session/failRegister'}), registerController)

router.get('/failRegister', failRegisterController)

router.post('/login', passport.authenticate('login', {failureRedirect: '/session/failLogin'}), loginController)

router.get('/failLogin', failLoginController)

router.get('/logout', passport.authenticate('current', { session: false }), logoutController);

router.get('/github', passport.authenticate('github', { scope: ['user: email']}), githubController)

router.get('/githubcallback', passport.authenticate('github' , { failureRedirect: '/login'}), githubCallBackController)

router.post('/forget-password', async (req, res) => {
    const email = req.body.email
    const user = await UserModel.findOne({ email })
    if (!user) {
        return res.status(404).json({ status: 'error', error: 'User not found' })
    }
    const token = generateRandomString(16);
    await UserPasswordModel.create({ email, token })
    const mailerConfig = {
        service: 'gmail',
        auth: { user: config.nodemailer.user, pass: config.nodemailer.pass },
        tls: {
            rejectUnauthorized: false
        }
    }
    let transporter = nodemailer.createTransport(mailerConfig)
    let message = {
        from: config.nodemailer.user,
        to: email,
        subject: '[Coder e-comm API] Reset your password',
        html: `<h1>[Coder e-comm API] Reset your password</h1><hr />You have asked to reset your password. You can do it here: <a href="http://${req.hostname}:${PORT}/reset-password/${token}">http://${req.hostname}:${PORT}/reset-password/${token}</a><hr />Best regards,<br><strong>The Coder e-comm API team</strong>`
    }
    try {
        await transporter.sendMail(message)
        res.json({ status: 'success', message: `Email successfully sent to ${email} in order to reset password` })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 'error', error: err.message })
    }
})

router.get('/verify-token/:token', async (req, res) => {
    const userPassword = await UserPasswordModel.findOne({ token: req.params.token })
    if (!userPassword) {
        return res.status(404).json({ status: 'error', error: 'Token no válido / El token ha expirado' })
    }
    const user = userPassword.email
    res.render('sessions/reset-password', { user })
})

router.post('/reset-password/:user', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.params.user })
        await UserModel.findByIdAndUpdate(user._id, { password: createHash(req.body.newPassword) })
        res.json({ status: 'success', message: 'Se ha creado una nueva contraseña' })
        await UserPasswordModel.deleteOne({ email: req.params.user })
    } catch(err) {
        res.json({ status: 'error', error: err.message })
    }
})

export default router