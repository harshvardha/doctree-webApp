import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { DoctreeContext } from "../../context/doctreeContext"
import { CgProfile } from "react-icons/cg"
import logo from "../../images/logo.png"
import "./PrescriptionDetails.css"

const PrescriptionDetails = () => {
    const [prescription, setPrescription] = useState({})
    const params = useParams()
    const { role, prescriptions } = useContext(DoctreeContext)

    useEffect(() => {
        setPrescription(prescriptions.find(p => {
            console.log(p._id)
            console.log(params.prescriptionId)
            // p._id === params.prescriptionId
        }), [])
    })

    return (
        <div className="prescriptionDetail">
            <div className="prescriptionDetail--nav">
                <img src={logo} alt="logo" />
                <button type="button" onClick={() => console.log("clicked")} id="profileButton"><CgProfile id="profileIcon" /></button>
            </div>
            <div className="prescriptionDetail--details">
                <div className="prescription--detail">
                    {role === "patient" && <h3>Name</h3>}
                    {role === "doctor" && <h3>Patient Name</h3>}
                    <p>{prescription.name}</p>
                </div>
                <div className="prescription--detail">
                    <h3>Date</h3>
                    <p>{prescription.date}</p>
                </div>
                <div className="prescription--detail">
                    <h3>Symptoms</h3>
                    <p>{prescription.symptoms}</p>
                </div>
                <div className="prescription--detail">
                    <h3>Disease</h3>
                    <p>{prescription.disease}</p>
                </div>
                <div className="prescription--detail">
                    <h3>Medicines</h3>
                    <p>{prescription.medicines}</p>
                </div>
                <div className="prescription--detail">
                    <h3>Pathological Information</h3>
                    <p>{prescription.pathologicalInformation}</p>
                </div>
                {role === "patient" &&
                    <div className="prescription--detail">
                        <h3>Doctor Name</h3>
                        <p>{prescription.doctor.name}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default PrescriptionDetails