import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { authentication } from "../../services/supplier"
import { DoctreeContext } from "../../context/doctreeContext"
import "./Login.css"

const Login = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigateTo = useNavigate()
    const { role, setAccessToken, setRole } = useContext(DoctreeContext)

    const onSubmit = async (event) => {
        event.preventDefault()
        if (!name || !email || !password || !role) {
            return window.alert("Please enter all the details")
        }
        const loginDetails = {
            email,
            password,
            role
        }
        const response = await authentication.login(loginDetails)
        setAccessToken(response.data.accessToken)
        if (role.toLowerCase() === "patient") {
            setRole("patient")
        }
        else if (role.toLowerCase() === "doctor") {
            setRole("doctor")
        }
        navigateTo("/prescriptions")
    }
    return (
        <div className="login">
            <div className="login--title">
                <h1>Login</h1>
            </div>
            <form onSubmit={onSubmit}>
                <div className="login--form">
                    <div className="login--form--details">
                        <label htmlFor="name">Name</label>
                        <input
                            className="login--form--input"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="login--form--details">
                        <label htmlFor="email">Email</label>
                        <input
                            className="login--form--input"
                            type="text"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="login--form--details">
                        <label htmlFor="password">Password</label>
                        <input
                            className="login--form--input"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="login--form--role">
                        <label htmlFor="role">Role </label>
                        <div className="login--form--radioInputs">
                            <div className="login--form--radioButtons">
                                <input
                                    type="radio"
                                    name="role"
                                    id="patient"
                                    value="patient"
                                    onChange={(event) => setRole(event.target.value)}
                                    required
                                />
                                <label htmlFor="patient">Patient</label>
                            </div>
                            <div className="login--form--radioButtons">
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
                    <div className="login--form--buttons">
                        <button className="loginButton" type="submit">Login</button>
                        <Link to={"/signup"} id="signup">Not a user? Signup</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login