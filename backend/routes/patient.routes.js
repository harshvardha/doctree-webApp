const express = require("express")
const { check } = require("express-validator")

const verifyAccessToken = require("../middleware/verifyToken")
const patientController = require("../controllers/patient.controller")

const patientRouter = express.Router()

patientRouter.post("/medicalData", verifyAccessToken, patientController.postMedicalData)
patientRouter.put("/medicalData", verifyAccessToken, patientController.putMedicalData)
patientRouter.put(
    "/personalData",
    [
        check("email").normalizeEmail().isEmail()
    ],
    verifyAccessToken,
    patientController.putPersonalData
)
patientRouter.get("/prescriptions", verifyAccessToken, patientController.getPrescriptions)
patientRouter.get("/prescriptions/:prescriptionId", verifyAccessToken, patientController.getPrescription)
patientRouter.get("/doctors/:name", verifyAccessToken, patientController.getDoctors)
patientRouter.get("/doctor/:doctorId", verifyAccessToken, patientController.getDoctor)

module.exports = patientRouter