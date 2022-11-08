const mongoose = require("mongoose")

const Schema = mongoose.Schema

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    speciality: {
        type: String
    },
    registrationNo: {
        type: Number,
        required: true
    },
    batchYear: {
        type: Number,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    practiceExperience: {
        type: Number,
        required: true
    },
    patients: {
        type: [],
        ref: 'patient'
    }
})

module.exports = mongoose.model('doctor', doctorSchema)