import { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function AddCharacter() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: '',
        images: '',
        relatives: {father: '', mother: '', spouses: [], lovers: [], children: [], siblings: []},
        strength: '',
        intelligence: '',
        cost: '',
        isPlayable: false,
    })

    const [error, setError] = useState('')
    console.log(formData)
    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    function handleRelatives(e) {
        const newFormData = structuredClone(formData)
        newFormData.relatives[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    function handleRelativesArray(e) {
        const newFormData = structuredClone(formData)
        const newArray = e.target.value.split(',')
        newFormData.relatives[e.target.name] = newArray
        setFormData(newFormData)
    }

    function handleSelect(e) {
        const newFormData = structuredClone(formData)
        if (e.target.checked) {
            newFormData[e.target.name] = true
        } else {
            newFormData[e.target.name] = false  
        }
        setFormData(newFormData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            await axios.post('/api/characters', formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            navigate('/characters')
        } catch (err) {
            const error = err.response.data.message
            setError(error)
        }
    }

    return <div className="section">
        <p>{error}</p>
        <div className="container">

            <h1 className="title">Add Character</h1>
            <form onSubmit={handleSubmit} className="box">
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'name'}
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'description'}
                            onChange={handleChange}
                            value={formData.description}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Type</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'type'}
                            onChange={handleChange}
                            value={formData.type}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Images</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'images'}
                            onChange={handleChange}
                            value={formData.images}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Father</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'father'}
                            onChange={handleRelatives}
                            value={formData.relatives.father}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Mother</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'mother'}
                            onChange={handleRelatives}
                            value={formData.relatives.mother}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Spouses</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'spouses'}
                            onChange={handleRelativesArray}
                            value={formData.relatives.spouses}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Lovers</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'lovers'}
                            onChange={handleRelativesArray}
                            value={formData.relatives.lovers}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Children</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'children'}
                            onChange={handleRelativesArray}
                            value={formData.relatives.children}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Siblings</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'siblings'}
                            onChange={handleRelativesArray}
                            value={formData.relatives.siblings}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Strength</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'strength'}
                            onChange={handleChange}
                            value={formData.strength}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Intelligence</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'intelligence'}
                            onChange={handleChange}
                            value={formData.intelligence}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Cost</label>
                    <div className="control">
                        <input
                            className="input is-hovered"
                            type="text"
                            name={'cost'}
                            onChange={handleChange}
                            value={formData.cost}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Is playable</label>
                    <div className="control">
                        <input
                            type="checkbox"
                            name={'isPlayable'}
                            onChange={handleSelect}
                            value={formData.isPlayable}
                            checked={formData.isPlayable}
                        />
                    </div>
                </div>
                <button className="button is-primary">Submit</button>
            </form>
        </div>
    </div>
}