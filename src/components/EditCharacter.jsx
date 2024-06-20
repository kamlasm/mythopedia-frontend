import axios from "axios"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useEffect, useState } from 'react'
import { isAdmin } from "../lib/auth"

export default function EditCharacter() {

    const navigate = useNavigate()

    const { characterName } = useParams()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: '',
        images: '',
        relatives: { father: '', mother: '', spouses: [], lovers: [], children: [], siblings: [] },
        strength: '',
        intelligence: '',
        cost: '',
        isPlayable: false,
    })
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchCharacter() {
            try {
                const resp = await fetch(`/api/characters/${characterName}`)
                const data = await resp.json()
                setFormData({
                    name: `${data.name}`,
                    description: `${data.description}`,
                    type: `${data.type}`,
                    images: `${data.images}`,
                    relatives: { father: `${data.relatives.father}`, mother: `${data.relatives.mother}`, spouses: `${data.relatives.spouses}`, lovers: `${data.relatives.lovers}`, children: `${data.relatives.children}`, siblings: `${data.relatives.siblings}` },
                    strength: `${data.strength}`,
                    intelligence: `${data.intelligence}`,
                    cost: `${data.cost}`,
                    isPlayable: `${data.isPlayable}`,
                })
            } catch (err) {
                const error = err.response.data.message
                setError(error)
            }

        }
        fetchCharacter()
    }, [characterName])

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
        const newFormData = structuredClone(formData)
        newFormData.relatives.spouses = newFormData.relatives.spouses.split(',')
        newFormData.relatives.lovers = newFormData.relatives.lovers.split(',')
        newFormData.relatives.children = newFormData.relatives.children.split(',')
        newFormData.relatives.siblings = newFormData.relatives.siblings.split(',')
        setFormData(newFormData)
        try {
            const token = localStorage.getItem('token')
            await axios.put(`/api/characters/${characterName}`, newFormData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            navigate(`/characters/${characterName}`)
        } catch (err) {
            const error = err.response.data.message
            setError(error)
        }
    }

    if (!isAdmin()) {
        return <div className="section">
            <div className="container">
                <div className="title">
                    You are not authorised!
                </div>
            </div>
        </div>
    }
    return <div className="section">
        <p>{error}</p>
        <div className="container">

            <h1 className="title">Edit Character</h1>
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
                            className="input"
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
                            className="input"
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
                            className="input"
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
                            className="input"
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
                            className="input"
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
                            type="number"
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
                            type="number"
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
                            type="number"
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
                            checked
                        />
                    </div>
                </div>
                <button className="button is-primary">Submit</button>
            </form>
            <Link to={`/characters/${characterName}`} className='button is-warning' >Back to {formData.name}</Link>
        </div>
    </div>
}