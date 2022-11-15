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
// doctorRouter.get("/prescriptionById", verifyAccessToken, doctorControllers.getPrescriptionById)
doctorRouter.post(
    "/addPrescription",
    [
        check("email").normalizeEmail().isEmail()
    ],
    verifyAccessToken,
    doctorControllers.postCreatePrescription
)
doctorRouter.put("/updatePersonalData", verifyAccessToken, doctorControllers.putUpdatePersonalData)

module.exports = doctorRouter