import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { authentication } from "../../services/supplier"
import "./Signup.css"

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("patient")
    const [registrationNo, setRegistrationNo] = useState("")
    const [qualification, setQualification] = useState("")
    const [speciality, setSpeciality] = useState("")
    const [batchYear, setBatchYear] = useState("")
    const [college, setCollege] = useState("")
    const [practiceExperience, setPracticeExperience] = useState(1)
    const [hospitalName, setHospitalName] = useState("")
    const [hospitalTiming, setHospitalTiming] = useState("")
    const [pincode, setPincode] = useState()
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const navigateTo = useNavigate()

    const signup = async (event) => {
        event.preventDefault()
        try {
            if (role) {
                let signupDetails
                if (role.toLowerCase() === "patient") {
                    if (!name || !email || !password) {
                        window.alert("Please enter all the required details")
                    }
                    console.log(`name: ${name}, email: ${email}, password: ${password}`)
                    signupDetails = {
                        name,
                        email,
                        password
                    }
                    const response = await authentication.patientSignup(signupDetails)
                    console.log(`patient signup successfull: ${response}`)
                }
                else if (role.toLowerCase() === "doctor") {
                    console.log(`name: ${name}`)
                    console.log(`email: ${email}`)
                    console.log(`password: ${password}`)
                    console.log(`registrationNo: ${registrationNo}`)
                    console.log(`qualification: ${qualification}`)
                    console.log(`speciality: ${speciality}`)
                    console.log(`batchYear: ${batchYear}`)
                    console.log(`college: ${college}`)
                    console.log(`practiceExperience: ${practiceExperience}`)
                    console.log(`hospitalName: ${hospitalName}`)
                    console.log(`hospitalTiming: ${hospitalTiming}`)
                    console.log(`pincode: ${pincode}`)
                    console.log(`address: ${address}`)
                    console.log(`city: ${city}`)
                    console.log(`state: ${state}`)
                    if (
                        !name || !email || !password || !registrationNo || !qualification || !speciality || !batchYear ||
                        !college || !practiceExperience || !hospitalName || !hospitalTiming || !pincode || !address || !city || !state
                    ) {
                        window.alert("Please fill all the required details")
                    }
                    signupDetails = {
                        name,
                        email,
                        password,
                        registrationNo,
                        qualification,
                        speciality,
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
                    const response = await authentication.doctorSignup(signupDetails)
                    console.log(`doctor signup successfull: ${response}`)
                }
                navigateTo("/")
            } else {
                window.alert("Please select your role")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="signup">
            <div className="signup--title">
                <h1>Signup</h1>
            </div>
            <form onSubmit={signup}>
                <div className="signup--form">
                    <div className="form--details">
                        <label htmlFor="name">Name</label>
                        <input
                            className="signup--form--input"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form--details">
                        <label htmlFor="email">Email</label>
                        <input
                            className="signup--form--input"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form--details">
                        <label htmlFor="password">Password</label>
                        <input
                            className="signup--form--input"
                            type="password"
                            minLength={6}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="form--details">
                        <label htmlFor="role">Role</label>
                        <div className="form--radioInputs">
                            <div className="form--radioButtons">
                                <input
                                    type="radio"
                                    name="role"
                                    id="patient"
                                    value="Patient"
                                    onChange={(event) => setRole(event.target.value)}
                                    required
                                />
                                <label htmlFor="patient">Patient</label>
                            </div>
                            <div className="form--radioButtons">
                                <input
                                    type="radio"
                                    name="role"
                                    id="doctor"
                                    value="doctor"
                                    onChange={(event) => setRole(event.target.value)}
                                    required
                                />
                                <label htmlFor="doctor">Doctor</label>
                            </div>
                        </div>
                    </div>
                    {role === "doctor" && (
                        <>
                            <div className="form--details">
                                <label htmlFor="registrationNo">Registration No.</label>
                                <input
                                    className="signup--form--input"
                                    type="text"
                                    value={registrationNo}
                                    onChange={(event) => setRegistrationNo(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form--details">
                                <label htmlFor="qualification">Qualification</label>
                                <input
                                    className="signup--form--input"
                                    type="text"
                                    value={qualification}
                                    onChange={(event) => setQualification(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form--details">
                                <label htmlFor="speciality">Specialization</label>
                                <input
                                    className="signup--form--input"
                                    type="text"
                                    value={speciality}
                                    onChange={(event) => setSpeciality(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form--details">
                                <label htmlFor="batchYear">Batch Year</label>
                                <input
                                    className="signup--form--input"
                                    type="number"
                                    value={batchYear}
                                    onChange={(event) => setBatchYear(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form--details">
                                <label htmlFor="college">College</label>
                                <input
                                    className="signup--form--input"
                                    type="text"
                                    value={college}
                                    onChange={(event) => setCollege(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form--details">
                                <label htmlFor="practiceExperience">Practice Experience</label>
                                <input
                                    className="signup--form--input"
                                    type="number"
                                    value={practiceExperience}
                                    onChange={(event) => setPracticeExperience(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form--details">
                                <label htmlFor="hospitalName">Hospital Name</label>
                                <input
                                    className="signup--form--input"
                                    type="text"
                                    value={hospitalName}
                                    onChange={(event) => setHospitalName(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form--details">
                                <label htmlFor="hospitalTiming">Hospital Timing</label>
                                <input
                                    className="signup--form--input"
                                    type="text"
                                    value={hospitalTiming}
                                    onChange={(event) => setHospitalTiming(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form--details">
                                <label htmlFor="pincode">Pincode</label>
                                <input
                                    className="signup--form--input"
                                    type="number"
                                    value={pincode}
                                    onChange={(event) => setPincode(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form--details">
                                <label htmlFor="address">Address</label>
                                <input
                                    className="signup--form--input"
                                    type="text"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form--details">
                                <label htmlFor="city">City</label>
                                <input
                                    className="signup--form--input"
                                    type="text"
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="form--details">
                                <label htmlFor="state">State</label>
                                <input
                                    className="signup--form--input"
                                    type="text"
                                    value={state}
                                    onChange={(event) => setState(event.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}
                    <div className="form--buttons">
                        <button type="submit" className="signupButton">Signup</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup