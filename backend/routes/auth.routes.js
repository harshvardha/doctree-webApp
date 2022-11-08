const express = require("express")

const authController = require("../controllers/auth.controller")

const authRouter = express.Router()

authRouter.post("/signup/patient", authController.postRegisterNewPatient)
authRouter.post("/signup/doctor", authController.postRegisterNewDoctor)
authRouter.post("/login/patient", authController.postLoginPatient)
authRouter.post("/login/doctor", authController.postLoginDoctor)

module.exports = authRouter