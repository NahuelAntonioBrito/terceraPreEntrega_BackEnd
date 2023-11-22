import { JWT_COOKIE_NAME } from "../utils.js";
import CustomError from '../services/errors/custom.error.js'
import { generateErrorInfo} from '../services/errors/info.js'
import EErros from "../services/errors/dictionary.js";

export const registerController = async(req, res) => {
    res.redirect('/')
}

export const failRegisterController = (req, res) => res.send({ error: 'Passport register Failed'})

export const loginController = async(req, res) => {
    if(!req.user){
        return res.status(400).send({ status:'error', error:'Invalid credentials'})
    }

    res.cookie(JWT_COOKIE_NAME, req.user.token).redirect('/products');
}

export const failLoginController = (req, res) => {
    if (!req.user) {
        CustomError.createError({
            name: "Login  error",
            cause: generateErrorInfo(req.user),
            message: "Error trying to Login",
            code: EErros.LOGIN_ERROR
        })
    }
}

export const logoutController = (req, res) => {
    res.clearCookie(JWT_COOKIE_NAME).redirect('/');
}

export const githubController = (reqe, res) => {}

export const githubCallBackController = async( req, res) => {
    console.log('Callback: ', req.user )
    req.session.user = req.user
    res.redirect('/products')
}