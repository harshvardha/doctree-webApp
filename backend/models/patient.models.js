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
    prescriptions: [
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
                type: String
            },
            doctor: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'doctor'
            }
        }
    ]
})

module.exports = mongoose.model("patient", patientSchema)