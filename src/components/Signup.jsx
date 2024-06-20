import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function Signup() {

    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    })

    const [error, setError] = React.useState('')

    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/sign-up', formData)
            const token = data.token;
            localStorage.setItem('token', token);

            navigate('/your-team')
        } catch (err) {
            setError(err.response.data.message)
        }
    }

    return <div className="section">
        <p>{error}</p>
        <div className="container">
       
            <h1 className="title">Sign Up</h1>
            <form onSubmit={handleSubmit} className="box">
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'username'}
                            onChange={handleChange}
                            value={formData.username}
                            placeholder="username"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'email'}
                            onChange={handleChange}
                            value={formData.email}
                            placeholder="e.g. name@email.com"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            name={'password'}
                            onChange={handleChange}
                            value={formData.password}
                            placeholder="********"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Confirm password</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            name={'passwordConfirmation'}
                            onChange={handleChange}
                            value={formData.passwordConfirmation}
                            placeholder="********"
                        />
                    </div>
                </div>
                <button className="button is-primary">Submit</button>
            </form>
        </div>
    </div>
}