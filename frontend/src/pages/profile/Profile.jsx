import { useState } from "react"
import { BiLogOutCircle } from "react-icons/bi"
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

    return (
        <div className="profile">
            <div className="profile--nav">
                <img src={logo} alt="logo" />
                <Link to={"/"} id="profileLink"><BiLogOutCircle id="profileIcon" /></Link>
            </div>
            <form action="">
                <div className="profile--details">
                    <div className="profile--detail">
                        <h3>Name</h3>
                        <input
                            className="profile--input"
                            type="text"
                            value="Harshvardhan Singh"
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="profile--detail">
                        <h3>Email</h3>
                        <input
                            className="profile--input"
                            type="text"
                            value="harshvardhansingh458@gmail.com"
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="profile--detail">
                        <h3>Qualification</h3>
                        <input
                            className="profile--input"
                            type="text"
                            value="B.Sc.,B.H.M.S."
                            onChange={(event) => setQualification(event.target.value)}
                            required
                        />
                    </div>
                    <div className="profile--detail">
                        <h3>Specialization</h3>
                        <input
                            className="profile--input"
                            type="text"
                            value="Physician & Consultant"
                            onChange={(event) => setSpeciality(event.target.value)}
                            required
                        />
                    </div>
                    <div className="profile--detail">
                        <h3>Registration No.</h3>
                        <input
                            className="profile--input"
                            type="text"
                            value="r1"
                            onChange={(event) => setRegistrationNo(event.target.value)}
                            required
                        />
                    </div>
                    <div className="profile--detail">
                        <h3>Batch Year</h3>
                        <input
                            className="profile--input"
                            type="number"
                            value="2022"
                            onChange={(event) => setBatchYear(event.target.value)}
                            required
                        />
                    </div>
                    <div className="profile--detail">
                        <h3>College</h3>
                        <input
                            className="profile--input"
                            type="text"
                            value="N.H.M.C. Lucknow"
                            onChange={(event) => setCollege(event.target.value)}
                            required
                        />
                    </div>
                    <div className="profile--detail">
                        <h3>Practice Experience</h3>
                        <input
                            className="profile--input"
                            type="number"
                            value="4"
                            onChange={(event) => setPracticeExperience(event.target.value)}
                            required
                        />
                    </div>
                    <div className="profile--detail">
                        <h3>Hospital Name</h3>
                        <input
                            className="profile--input"
                            type="text"
                            value="urmil homoe health care"
                            onChange={(event) => setHospitalName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="profile--detail">
                        <h3>Hospital Timing</h3>
                        <input
                            className="profile--input"
                            type="text"
                            value="Morning : 10:00 A.M. to 2:00 P.M.,Evening : 5:00 P.M. to 8:30 P.M."
                            onChange={(event) => setHospitalTiming(event.target.value)}
                            required
                        />
                    </div>
                    <div className="profile--detail">
                        <h3>Pincode</h3>
                        <input
                            className="profile--input"
                            type="number"
                            value="229001"
                            onChange={(event) => setPincode(event.target.value)}
                            required
                        />
                    </div>
                    <div className="profile--detail">
                        <h3>Address</h3>
                        <input
                            className="profile--input"
                            type="text"
                            value="1st floor,shop no.14,jila panchayat market,near civil lines"
                            onChange={(event) => setAddress(event.target.value)}
                            required
                        />
                    </div>
                    <div className="profile--detail">
                        <h3>City</h3>
                        <input
                            className="profile--input"
                            type="text"
                            value="Raebareli"
                            onChange={(event) => setCity(event.target.value)}
                            required
                        />
                    </div>
                    <div className="profile--detail">
                        <h3>State</h3>
                        <input
                            className="profile--input"
                            type="text"
                            value="Uttar pradesh"
                            onChange={(event) => setState(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" id="updateButton">Update</button>
                </div>
            </form>
        </div>
    )
}

export default Profile