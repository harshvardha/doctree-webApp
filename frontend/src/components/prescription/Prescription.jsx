import { useContext } from "react"
import { DoctreeContext } from "../../context/doctreeContext"
import { Link } from "react-router-dom"
import "./Prescription.css"

const Prescription = ({ id, name, disease, medicines }) => {
    const { role } = useContext(DoctreeContext)
    return (
        <div className="prescriptionCard">
            <div className="card--name">
                <h3>Disease</h3>
                <p>{disease}</p>
            </div>
            <div className="card--name">
                <h3>Medicines</h3>
                <p>{medicines}</p>
            </div>
            <div className="card--name">
                {role === "patient" ? (
                    <h3>Doctor Name</h3>
                ) : (
                    <h3>Name</h3>
                )}
                <p>{name}</p>
            </div>
            <Link to={`/prescriptions/${id}`} id="viewDetails">View Details</Link>
        </div>
    )
}

export default Prescription