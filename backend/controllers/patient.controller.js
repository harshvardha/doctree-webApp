const Patient = require("../models/patient.models")
const Doctor = require("../models/doctors.models")
const { StatusCodes } = require("http-status-codes")
const { validationResult } = require("express-validator")
const { default: mongoose } = require("mongoose")

// const postMedicalData = async (req, res, next) => {
//     try {
//         const patientId = req.userId
//         const { date, disease, symptoms, medicines, pathologicalInformation } = req.body
//         if (!date || !disease || !symptoms || !medicines) {
//             return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Please provide all the medical information" })
//         }
//         const patient = await Patient.findById(patientId)
//         const prescription = {
//             date: date,
//             disease: disease,
//             symptoms: symptoms,
//             medicines: medicines,
//             pathologicalInformation: pathologicalInformation ? pathologicalInformation : "NA"
//         }
//         const prescriptions = patient.prescriptions
//         prescriptions.push(prescription)
//         patient.prescriptions = prescriptions
//         patient.save()
//         // prescription = patient.prescriptions[patient.prescription.length - 1]
//         res.status(StatusCodes.CREATED).json({ prescription })
//     } catch (error) {
//         res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
//         console.log(error)
//     }
// }

// const putMedicalData = async (req, res, next) => {
//     try {
//         const patientId = req.userId
//         const { prescriptionId, date, disease, symptoms, medicines, pathologicalInformation } = req.body
//         if (!prescriptionId || !date || !disease || !symptoms || !medicines) {
//             return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Please provide all the details" })
//         }
//         let patient = await Patient.findById(patientId)
//         patient.prescriptions = patient.prescriptions.map(prescription => {
//             if (prescription._id.toString() === prescriptionId) {
//                 prescription.date = date
//                 prescription.disease = disease
//                 prescription.symptoms = symptoms
//                 prescription.medicines = medicines
//                 prescription.pathologicalInformation = pathologicalInformation ? pathologicalInformation : "NA"
//             }
//             return prescription
//         })
//         patient.save()
//         res.status(StatusCodes.OK).json({ "prescription": patient.prescriptions })
//     } catch (error) {
//         res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
//         console.log(error)
//     }
// }

const putPersonalData = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Please provide correct email" })
        }
        const patientId = req.userId
        const { name, email } = req.body
        if (!name) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Please provide name" })
        }
        const patient = await Patient.findById(patientId)
        patient.name = name
        patient.email = email
        patient.save()
        res.sendStatus(StatusCodes.OK)
    } catch (error) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        console.log(error)
    }
}

const getPrescriptions = async (req, res, next) => {
    try {
        const patientId = req.userId
        const patient = await Patient.findById(patientId)
        let prescriptions = patient.prescriptions
        if (!prescriptions) {
            return res.sendStatus(StatusCodes.NOT_FOUND)
        }
        await patient.populate("prescriptions.doctor")
        res.status(StatusCodes.OK).json({ prescriptions })
    } catch (error) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        console.log(error)
    }
}

const getPrescription = async (req, res, next) => {
    try {
        const patientId = req.userId
        const { prescriptionId } = req.params
        const patient = await Patient.findById(patientId)
        await patient.populate("prescriptions.doctor")
        const prescription = patient.prescriptions.find(p => p._id.toString() === prescriptionId)
        if (!prescription) {
            return res.sendStatus(StatusCodes.NOT_FOUND)
        }
        res.status(StatusCodes.OK).json({ name: patient.name, prescription })
    } catch (error) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        console.log(error)
    }
}

const getDoctor = async (req, res, next) => {
    try {
        const { doctorId } = req.params
        if (!doctorId) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Please provide the doctor id" })
        }
        const doctor = await Doctor.findById(doctorId)
        if (!doctor) {
            return res.sendStatus(StatusCodes.NOT_FOUND)
        }
        res.status(StatusCodes.OK).json({ doctor })
    } catch (error) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        console.log(error)
    }
}

const getDoctors = async (req, res, next) => {
    try {
        const { name } = req.params
        if (!name) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Please provide the doctor name" })
        }
        const doctors = await Doctor.find({ name: name })
        if (!doctors) {
            return res.sendStatus(StatusCodes.NOT_FOUND)
        }
        res.status(StatusCodes.OK).json({ doctors })
    } catch (error) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        console.log(error)
    }
}

module.exports = {
    putPersonalData,
    getPrescriptions,
    getPrescription,
    getDoctor,
    getDoctors
}