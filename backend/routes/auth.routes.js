const express = require("express")
const { check } = require("express-validator")

const authController = require("../controllers/auth.controller")

const authRouter = express.Router()

authRouter.post(
    "/signup/patient",
    [
        check("name").notEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min: 6 })
    ],
    authController.postRegisterNewPatient
)
authRouter.post(
    "/signup/doctor",
    [
        check("name").notEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min: 6 })
    ],
    authController.postRegisterNewDoctor
)
authRouter.post(
    "/login",
    authController.postLoginUser
)

module.exports = authRouter