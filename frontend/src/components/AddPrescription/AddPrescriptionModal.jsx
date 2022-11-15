import { useState, useContext } from "react"
import { doctorRequests } from "../../services/supplier"
import { DoctreeContext } from "../../context/doctreeContext"
import { IoCloseSharp } from "react-icons/io5"
import "./AddPrescriptionModal.css"

const AddPrescriptionModal = ({ setOpen }) => {
    const { patient, setPatient } = useContext(DoctreeContext)
    const [date, setDate] = useState("")
    const [disease, setDisease] = useState("")
    const [symptoms, setSymptoms] = useState("")
    const [medicines, setMedicines] = useState("")
    const [pathologicalInformation, setPathologicalInformation] = useState("")

    const addPrescription = async (event) => {
        try {
            event.preventDefault()
            console.log(`date: ${date}`)
            console.log(`disease: ${disease}`)
            console.log(`symptoms: ${symptoms}`)
            console.log(`medicines: ${medicines}`)
            if (!date || !disease || !symptoms || !medicines) {
                return window.alert("Please provide all the details")
            }
            const prescription = {
                email: patient.email,
                date,
                disease,
                symptoms,
                medicines,
                pathologicalInformation
            }
            const accessToken = localStorage.getItem("ACCESS_TOKEN")
            const response = await doctorRequests.addPrescription(accessToken, prescription)
            if (response.status === 201) {
                setPatient(response.data.patient)
                setOpen(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="overlay">
            <div className="addPrescriptionModal">
                <div className="addPrescriptionModal--title">
                    <h1>Add Prescription</h1>
                    <button type="button" onClick={() => setOpen(false)} id="closeModalButton"><IoCloseSharp id="closeModalIcon" /></button>
                </div>
                <div className="addPrescription--form">
                    <form onSubmit={addPrescription}>
                        <div className="addPrescription--formDetails">
                            <div className="addPrescription--inputs">
                                <label htmlFor="date">Date</label>
                                <input
                                    className="addPrescription--input"
                                    type="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="addPrescription--inputs">
                                <label htmlFor="symptoms">Symptoms</label>
                                <textarea
                                    className="addPrescription--textarea addPrescription--input"
                                    value={symptoms}
                                    onChange={(event) => setSymptoms(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="addPrescription--inputs">
                                <label htmlFor="disease">Disease</label>
                                <input
                                    className="addPrescription--input"
                                    type="text"
                                    value={disease}
                                    onChange={(event) => setDisease(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="addPrescription--inputs">
                                <label htmlFor="medicines">Medicines</label>
                                <textarea
                                    className="addPrescription--textarea addPrescription--input"
                                    value={medicines}
                                    onChange={(event) => setMedicines(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="addPrescription--inputs">
                                <label htmlFor="pathologicalInformation">Pathological Information</label>
                                <textarea
                                    className="addPrescription--textarea addPrescription--input"
                                    value={pathologicalInformation}
                                    onChange={(event) => setPathologicalInformation(event.target.value)}
                                />
                            </div>
                            <button type="submit" id="addPrescriptionButton">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPrescriptionModal