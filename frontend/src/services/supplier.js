import axios from "axios"

const api = axios.create()
const baseUrl = "http://localhost:5000"

// api calls for authentication
export const authentication = {
    patientSignup: (signupDetails) => api.post(`${baseUrl}/auth/signup/patient`, signupDetails),
    doctorSignup: (signupDetails) => api.post(`${baseUrl}/auth/signup/doctor`, signupDetails),
    login: (loginDetails) => api.post(`${baseUrl}/auth/login`, loginDetails),
}

// api calls for patients
export const patientRequests = {
    putPersonalData: (accessToken, personalDetails) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken
        return api.put(`${baseUrl}/patient/personalData`, personalDetails)
    },
    getPrescriptions: (accessToken) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken
        return api.get(`${baseUrl}/patient/prescriptions`)
    },
    getPrescription: (accessToken, prescriptionId) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken
        return api.get(`${baseUrl}/patient/prescriptions/${prescriptionId}`)
    }
}

// api calls for doctors
export const doctorRequests = {
    getPatient: (accessToken, email) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken
        return api.get(`${baseUrl}/doctor/patient?email=${email}`)
    },
    addPrescription: (accessToken, prescriptionDetails) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken
        return api.post(`${baseUrl}/doctor/addPrescription`, prescriptionDetails)
    },
    updatePersonalData: (accessToken, personalData) => {
        api.defaults.headers.common["authorization"] = "Bearer " + accessToken
        return api.put(`${baseUrl}/doctor/updatePersonalData`, personalData)
    }
}