const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { validationResult } = require("express-validator")
const { StatusCodes } = require("http-status-codes")
require("dotenv").config()

const Patient = require("../models/patient.models")
const Doctor = require("../models/doctors.models")

const postRegisterNewPatient = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Please enter correct details" })
        }
        const { name, email, password } = req.body
        const user = await Patient.findOne({ email: email })
        if (user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        await Patient.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        res.sendStatus(StatusCodes.CREATED)
    } catch (error) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        console.log(error)
    }
}

const postRegisterNewDoctor = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: "Please enter correct details" })
        }
        const {
            name,
            email,
            password,
            qualification,
            speciality,
            registrationNo,
            batchYear,
            college,
            practiceExperience,
            hospitalName,
            hospitalTiming,
            pincode,
            address,
            city,
            state
        } = req.body
        if (
            !qualification ||
            !speciality ||
            !registrationNo ||
            !batchYear ||
            !college ||
            !practiceExperience ||
            !hospitalName ||
            !hospitalTiming ||
            !pincode ||
            !address ||
            !city ||
            !state
        ) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please provide all the details" })
        }
        const doctor = await Doctor.findOne({ email: email })
        if (doctor) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "user already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        await Doctor.create({
            name: name,
            email: email,
            password: hashedPassword,
            qualification: qualification,
            speciality: speciality,
            registrationNo: registrationNo,
            batchYear: batchYear,
            college: college,
            practiceExperience: practiceExperience,
            hospitalName: hospitalName,
            hospitalTiming: hospitalTiming,
            pincode: pincode,
            address: address,
            city: city,
            state: state
        })
        res.sendStatus(StatusCodes.CREATED)
    } catch (error) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        console.log(error)
    }
}

const postLoginUser = async (req, res, next) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please provide all the details" })
        }
        let user, expirationTime
        if (role === "patient") {
            user = await Patient.findOne({ email: email })
            expirationTime = "10m"
        }
        else if (role === "doctor") {
            user = await Doctor.findOne({ email: email })
            expirationTime = "1h"
        }
        if (!user) {
            return res.sendStatus(StatusCodes.NOT_FOUND)
        }
        const correctPassword = await bcrypt.compare(password, user.password)
        if (!correctPassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please enter correct password" })
        }
        const accessToken = jwt.sign(
            {
                email,
                "id": user._id
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: expirationTime }
        )
        user.accessToken = accessToken,
            user.save()
        res.status(StatusCodes.OK).json({ user, accessToken })
    } catch (error) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        console.log(error)
    }
}

module.exports = {
    postRegisterNewPatient,
    postRegisterNewDoctor,
    postLoginUser
}