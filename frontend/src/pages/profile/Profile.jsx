import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { DoctreeContext } from "../../context/doctreeContext"
import { patientRequests, doctorRequests } from "../../services/supplier"
import { BiLogOutCircle } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import { Link } from "react-router-dom"
import logo from "../../images/logo.png"
import "./Profile.css"

const Profile = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [qualification, setQualification] = useState("")
    const [speciality, setSpeciality] = useState("")
    const [registrationNo, setRegistrationNo] = useState("")
    const [batchYear, setBatchYear] = useState("")
    const [college, setCollege] = useState("")
    const [practiceExperience, setPracticeExperience] = useState(1)
    const [hospitalName, setHospitalName] = useState("")
    const [hospitalTiming, setHospitalTiming] = useState("")
    const [pincode, setPincode] = useState()
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [role, setRole] = useState(localStorage.getItem("ROLE"))
    const [accessToken, setAccessToken] = useState(localStorage.getItem("ACCESS_TOKEN"))
    const { user, setUser, setPatient } = useContext(DoctreeContext)
    const navigateTo = useNavigate()

    const updatePersonaInformation = async (event) => {
        try {
            event.preventDefault()
            let updatedPersonalDetails = {
                name,
                email
            }
            if (role === "patient") {
                const response = await patientRequests.putPersonalData(accessToken, updatedPersonalDetails)
                if (response.status === 401) {
                    window.alert("Session Expired. Please login again")
                    navigateTo("/")
                }
                else if (response.status === 200) {
                    window.alert("updated")
                    navigateTo("/prescriptions")
                }
            }
            else if (role === "doctor") {
                updatedPersonalDetails = {
                    ...updatedPersonalDetails,
                    qualification,
                    speciality,
                    registrationNo,
                    batchYear,
                    college,
                    practiceExperience,
                    hospitalName,
                    hospitalTiming,
                    pincode,
                    address,
                    city,
                    state
                }
                const response = await doctorRequests.updatePersonalData(accessToken, updatedPersonalDetails)
                if (response.status === 401) {
                    window.alert("Session Expired. Please login again")
                    navigateTo("/")
                }
                else if (response.status === 200) {
                    window.alert("updated")
                    navigateTo("/prescriptions")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        localStorage.removeItem("ACCESS_TOKEN")
        localStorage.removeItem("ROLE")
        setUser(null)
        setPatient(null)
        navigateTo("/")
    }

    useEffect(() => {
        setName(user.name)
        setEmail(user.email)
        if (role === "doctor") {
            setQualification(user.qualification)
            setSpeciality(user.speciality)
            setRegistrationNo(user.registrationNo)
            setBatchYear(user.batchYear)
            setCollege(user.college)
            setPracticeExperience(user.practiceExperience)
            setHospitalName(user.hospitalName)
            setHospitalTiming(user.hospitalTiming)
            setPincode(user.pincode)
            setAddress(user.address)
            setCity(user.city)
            setState(user.state)
        }
    }, [])

    return (
        <>
            {role &&
                <div className="profile">
                    <div className="profile--nav">
                        <img src={logo} alt="logo" />
                        <Link to={"/"} id="profileLink"><CgProfile id="profileIcon" /></Link>
                        <button type="button" onClick={logout} id="logoutButton"><BiLogOutCircle id="logoutIcon" /></button>
                    </div>
                    <form onSubmit={updatePersonaInformation}>
                        <div className="profile--details">
                            <div className="profile--detail">
                                <h3>Name</h3>
                                <input
                                    className="profile--input"
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="profile--detail">
                                <h3>Email</h3>
                                <input
                                    className="profile--input"
                                    type="text"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>
                            {role === "doctor" &&
                                <>
                                    <div className="profile--detail">
                                        <h3>Qualification</h3>
                                        <input
                                            className="profile--input"
                                            type="text"
                                            value={qualification}
                                            onChange={(event) => setQualification(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="profile--detail">
                                        <h3>Specialization</h3>
                                        <input
                                            className="profile--input"
                                            type="text"
                                            value={speciality}
                                            onChange={(event) => setSpeciality(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="profile--detail">
                                        <h3>Registration No.</h3>
                                        <input
                                            className="profile--input"
                                            type="text"
                                            value={registrationNo}
                                            onChange={(event) => setRegistrationNo(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="profile--detail">
                                        <h3>Batch Year</h3>
                                        <input
                                            className="profile--input"
                                            type="number"
                                            value={batchYear}
                                            onChange={(event) => setBatchYear(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="profile--detail">
                                        <h3>College</h3>
                                        <input
                                            className="profile--input"
                                            type="text"
                                            value={college}
                                            onChange={(event) => setCollege(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="profile--detail">
                                        <h3>Practice Experience</h3>
                                        <input
                                            className="profile--input"
                                            type="number"
                                            value={practiceExperience}
                                            onChange={(event) => setPracticeExperience(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="profile--detail">
                                        <h3>Hospital Name</h3>
                                        <input
                                            className="profile--input"
                                            type="text"
                                            value={hospitalName}
                                            onChange={(event) => setHospitalName(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="profile--detail">
                                        <h3>Hospital Timing</h3>
                                        <input
                                            className="profile--input"
                                            type="text"
                                            value={hospitalTiming}
                                            onChange={(event) => setHospitalTiming(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="profile--detail">
                                        <h3>Pincode</h3>
                                        <input
                                            className="profile--input"
                                            type="number"
                                            value={pincode}
                                            onChange={(event) => setPincode(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="profile--detail">
                                        <h3>Address</h3>
                                        <input
                                            className="profile--input"
                                            type="text"
                                            value={address}
                                            onChange={(event) => setAddress(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="profile--detail">
                                        <h3>City</h3>
                                        <input
                                            className="profile--input"
                                            type="text"
                                            value={city}
                                            onChange={(event) => setCity(event.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="profile--detail">
                                        <h3>State</h3>
                                        <input
                                            className="profile--input"
                                            type="text"
                                            value={state}
                                            onChange={(event) => setState(event.target.value)}
                                            required
                                        />
                                    </div>
                                </>
                            }
                            <button type="submit" id="updateButton">Update</button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default Profile