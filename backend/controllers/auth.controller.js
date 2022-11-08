const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { StatusCodes } = require("http-status-codes")
require("dotenv").config()

const Patient = require("../models/patient.models")
const Doctor = require("../models/doctors.models")

const postRegisterNewPatient = async (req, res, next) => {
    try {

    } catch (error) {
        console.log(error)
    }
}

const postRegisterNewDoctor = async (req, res, next) => {
    try {

    } catch (error) {
        console.log(error)
    }
}

const postLoginPatient = async (req, res, next) => {
    try {

    } catch (error) {
        console.log(error)
    }
}

const postLoginDoctor = async (req, res, next) => {
    try {

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    postRegisterNewPatient,
    postRegisterNewDoctor,
    postLoginPatient,
    postLoginDoctor
}