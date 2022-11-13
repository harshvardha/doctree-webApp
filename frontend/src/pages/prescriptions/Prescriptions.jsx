import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { CgProfile } from "react-icons/cg"
import { FiSearch } from "react-icons/fi"
import { BiLogOutCircle } from "react-icons/bi"
import SearchModal from "../../components/search/SearchModal"
import Prescription from "../../components/prescription/Prescription"
import "./Prescriptions.css"
import logo from "../../images/logo.png"
import { DoctreeContext } from "../../context/doctreeContext"
import { patientRequests } from "../../services/supplier"

const Prescriptions = () => {
    const [open, setOpen] = useState(false)
    const [prescriptionComponents, setPrescriptionComponents] = useState([])
    const { role, accessToken, setPrescriptions } = useContext(DoctreeContext)
    const navigateTo = useNavigate()

    useEffect(() => {
        console.log(role)
        console.log(accessToken)
        const getData = async () => {
            const response = await patientRequests.getPrescriptions(accessToken)
            if (response.status === 401) {
                window.alert("Session Expired. Please login again")
                navigateTo("/")
            }
            setPrescriptions(response.data.prescriptions)
            setPrescriptionComponents(
                response.data.prescriptions.map(prescription => <Prescription id={prescription._id} name={prescription.doctor.name} disease={prescription.disease} medicines={prescription.medicines} />)
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
                    <Link to={"/profile"}><CgProfile id="profile" /></Link>
                    <Link to={"/"}><BiLogOutCircle id="logoutIcon" /></Link>
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