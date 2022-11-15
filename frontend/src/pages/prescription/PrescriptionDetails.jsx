import { useState, useEffect, useContext } from "react"
import { DoctreeContext } from "../../context/doctreeContext"
import { Link, useNavigate } from "react-router-dom"
import { patientRequests } from "../../services/supplier"
import { useParams } from "react-router-dom"
import { CgProfile } from "react-icons/cg"
import { BiLogOutCircle } from "react-icons/bi"
import logo from "../../images/logo.png"
import "./PrescriptionDetails.css"

const PrescriptionDetails = () => {
    const params = useParams()
    const { user, patient, setUser, setPatient } = useContext(DoctreeContext)
    const [patientName, setPatientName] = useState("")
    const [prescription, setPrescription] = useState()
    const [role, setRole] = useState(localStorage.getItem("ROLE"))
    const navigateTo = useNavigate()

    const logout = () => {
        localStorage.removeItem("ACCESS_TOKEN")
        localStorage.removeItem("ROLE")
        setPatient(null)
        setUser(null)
        navigateTo("/")
    }

    useEffect(() => {
        const getData = async () => {
            const accessToken = localStorage.getItem("ACCESS_TOKEN")
            const prescriptionId = params.prescriptionId
            const response = await patientRequests.getPrescription(accessToken, prescriptionId)
            setPrescription(response.data.prescription)
            setPatientName(response.data.name)
        }
        if (role === "patient") {
            getData()
        }
        else if (role === "doctor" && patient) {
            const prescriptionId = params.prescriptionId
            const prescription = patient.prescriptions.find(prescription => prescription._id === prescriptionId)
            setPatientName(patient.name)
            setPrescription(prescription)
        }
    }, [patient])

    return (
        <div className="prescriptionDetail">
            <div className="prescriptionDetail--nav">
                <img src={logo} alt="logo" />
                <div className="prescription--nav--button">
                    <Link to={`/profile/${user?._id}`} ><CgProfile id="profileIcon" /></Link>
                    <button type="button" onClick={logout} id="logoutButton"><BiLogOutCircle id="logoutIcon" /></button>
                </div>
            </div>
            <div className="prescriptionDetail--details">
                <div className="prescription--detail">
                    {role === "patient" && <h3>Name</h3>}
                    {role === "doctor" && <h3>Patient Name</h3>}
                    <p>{patientName}</p>
                </div>
                <div className="prescription--detail">
                    <h3>Date</h3>
                    <p>{prescription ? (prescription.date ? new Date(prescription.date).toDateString() : "") : ""}</p>
                </div>
                <div className="prescription--detail">
                    <h3>Symptoms</h3>
                    <p>{prescription ? (prescription.symptoms ? prescription.symptoms : "") : ""}</p>
                </div>
                <div className="prescription--detail">
                    <h3>Disease</h3>
                    <p>{prescription ? (prescription.disease ? prescription.disease : "") : ""}</p>
                </div>
                <div className="prescription--detail">
                    <h3>Medicines</h3>
                    <p>{prescription ? (prescription.medicines ? prescription.medicines : "") : ""}</p>
                </div>
                <div className="prescription--detail">
                    <h3>Pathological Information</h3>
                    <p>{prescription ? (prescription.pathologicalInformation ? prescription.pathologicalInformation : "") : ""}</p>
                </div>
                {role === "patient" &&
                    <div className="prescription--detail">
                        <h3>Doctor Name</h3>
                        <p>{prescription ? (prescription.doctor.name ? prescription.doctor.name : "") : ""}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default PrescriptionDetails