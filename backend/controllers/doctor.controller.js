const Doctor = require("../models/doctors.models")
const Patient = require("../models/patient.models")
const { StatusCodes } = require("http-status-codes")
const { validationResult } = require("express-validator")

const ITEMS_PER_PAGE = 10

const postPatientData = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Please provide correct email" })
        }
        const doctorId = req.userId
        const {
            email,
            date,
            disease,
            symptoms,
            medicines,
            pathologicalInformation
        } = req.body
        if (
            !date ||
            !disease ||
            !symptoms ||
            !medicines
        ) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Please provide all the details" })
        }
        const patient = await Patient.findOne({ email: email })
        const prescriptions = patient.prescriptions
        const prescription = {
            date: date,
            disease: disease,
            symptoms: symptoms,
            medicines: medicines,
            pathologicalInformation: pathologicalInformation ? pathologicalInformation : ""
        }
        prescriptions.push(prescription)
        patient.prescriptions = prescriptions
        const patientDoctors = patient.doctors
        const doctor = await Doctor.findById(doctorId)
        const patients = doctor.patients
        const found = patientDoctors.find(doctor => doctor._id === doctorId)
        if (!found) {
            patientDoctors.push(doctor)
            patient.doctors = patientDoctors
            patients.push(patient)
        }
        patient.save()
        doctor.save()
        // await Patient.findOneAndUpdate({email: email}, {
        //     date: date,
        //     disease: disease,
        //     symptoms: symptoms,
        //     medicines: medicines,
        //     pathologicalInformation: pathologicalInformation ? pathologicalInformation : ""
        // })
        res.status(StatusCodes.CREATED).json({ patient })
    } catch (error) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        console.log(error)
    }
}

// const putPatientData = async (req, res, next) => {
//     try {
//         const errors = validationResult(req)
//         if(!errors.isEmpty()) {
//             return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({message: "Please provide correct email"})
//         }
//         const {
//             email,
//             date,
//             disease,
//             symptoms,
//             medicines,
//             pathologicalInformation
//         } = req.body
//         if(
//             !date ||
//             !disease ||
//             !symptoms ||
//             !medicines
//         ) {
//             return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({message: "Please provide all the details"})
//         }
//         await Patient.findOneAndUpdate({email: email}, {
//             date: date,
//             disease: disease,
//             symptoms: symptoms,
//             medicines: medicines,
//             pathologicalInformation: pathologicalInformation ? pathologicalInformation : ""
//         })
//         res.sendStatus(StatusCodes.OK)
//     } catch (error) {
//         res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
//         console.log(error)
//     }
// }

const getPrescriptionPDF = async (req, res, next) => {
    try {

    } catch (error) {
        console.log(error)
    }
}

const getPatientsData = async (req, res, next) => {
    try {
        const id = req.userId
        const page = +req.query.page || 1
        const doctor = await Doctor.findOne({ id: id })
        let patients = doctor.patients
        const startingIndex = (page - 1) * ITEMS_PER_PAGE
        const endIndex = startingIndex + ITEMS_PER_PAGE - 1
        patients = patients.slice(startingIndex, endIndex >= patients.length ? patients.length - 1 : endIndex)
        res.status(StatusCodes.OK).json({ patients })
    } catch (error) {
        console.log(error)
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

const getPatientData = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Please provide correct email" })
        }
        const { email } = req.body
        const patient = await Patient.findOne({ email: email })
        if (!patient) {
            return res.sendStatus(StatusCodes.NOT_FOUND)
        }
        res.status(StatusCodes.OK).json({ patient })
    } catch (error) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        console.log(error)
    }
}

module.exports = {
    postPatientData,
    getPrescriptionPDF,
    getPatientsData,
    getPatientData
}