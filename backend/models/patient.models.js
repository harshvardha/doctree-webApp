const mongoose = require("mongoose")

const Schema = mongoose.Schema

const patientSchema = new Schema({
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
    prescription: [
        {
            date: {
                type: Date,
                required: true
            },
            disease: {
                type: String,
                required: true
            },
            symptoms: {
                type: String,
                required: true
            },
            medicines: {
                type: String,
                required: true
            },
            pathologicalInformation: {
                type: String,
                required: true
            }
        }
    ],
    doctor: {
        type: [],
        ref: 'doctor'
    }
})

module.exports = mongoose.model("patient", patientSchema)