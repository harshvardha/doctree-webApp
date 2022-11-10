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
        type: String,
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
    hospitalName: {
        type: String,
        required: true
    },
    hospitalTiming: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('doctor', doctorSchema)