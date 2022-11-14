import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CgProfile } from "react-icons/cg"
import { FiSearch } from "react-icons/fi"
import { BiLogOutCircle } from "react-icons/bi"
import SearchModal from "../../components/search/SearchModal"
import Prescription from "../../components/prescription/Prescription"
import "./Prescriptions.css"
import logo from "../../images/logo.png"
import { patientRequests } from "../../services/supplier"
import { DoctreeContext } from "../../context/doctreeContext"

const Prescriptions = () => {
    const [open, setOpen] = useState(false)
    const [prescriptionComponents, setPrescriptionComponents] = useState([])
    const [role, setRole] = useState(localStorage.getItem("ROLE"))
    const { user } = useContext(DoctreeContext)
    const navigateTo = useNavigate()

    const logout = (event) => {
        localStorage.removeItem("ACCESS_TOKEN")
        localStorage.removeItem("ROLE")
        navigateTo("/")
    }

    useEffect(() => {
        const getData = async () => {
            const accessToken = localStorage.getItem("ACCESS_TOKEN")
            const response = await patientRequests.getPrescriptions(accessToken)
            if (response.status === 401) {
                window.alert("Session Expired. Please login again")
                navigateTo("/")
            }
            setPrescriptionComponents(
                response.data.prescriptions.map(prescription => <Prescription
                    key={prescription._id}
                    id={prescription._id}
                    role={role}
                    name={prescription.doctor.name}
                    disease={prescription.disease}
                    medicines={prescription.medicines}
                />)
            )
        }
        if (role === "patient") {
            getData()
        }
    }, [])

    return (
        <div className="prescriptions">
            <div className="prescription--nav">
                <img src={logo} alt="logo" />
                <div className="prescription--buttons">
                    {role === "doctor" && <button type="button" onClick={() => setOpen(true)} id="searchButton"><FiSearch id="search" /></button>}
                    <Link to={`/profile/${user._id}`}><CgProfile id="profile" /></Link>
                    <button type="button" onClick={logout} id="logoutButton"><BiLogOutCircle id="logoutIcon" /></button>
                </div>
            </div>
            <div className="prescriptions--prescriptions">
                {prescriptionComponents}
            </div>
            {open && <SearchModal setOpen={setOpen} />}
        </div>
    )
}

export default Prescriptions