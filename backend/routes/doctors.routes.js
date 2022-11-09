const express = require("express")
const { check } = require("express-validator")

const verifyAccessToken = require("../middleware/verifyToken")
const doctorControllers = require("../controllers/doctor.controller")

const doctorRouter = express.Router()

doctorRouter.get(
    "/patient",
    [
        check("email").normalizeEmail().isEmail()
    ],
    verifyAccessToken,
    doctorControllers.getPatientData
)
doctorRouter.get("/patients", verifyAccessToken, doctorControllers.getPatientsData)
doctorRouter.post(
    "/updatePatient",
    [
        check("email").normalizeEmail().isEmail()
    ],
    verifyAccessToken,
    doctorControllers.postPatientData
)

module.exports = doctorRouter