import axios from "axios"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useEffect, useState } from 'react'


export default function EditCharacter() {

    const navigate = useNavigate()

    const { characterId } = useParams()
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: '',
        images: '',
        relatives: '',
        strength: '',
        intelligence: '',
        cost: '',

    })
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchCharacter() {
            try {
                const resp = await fetch(`/api/characters/${characterId}`)
                const data = await resp.json()
                setFormData({
                    name: `${data.name}`,
                    description: `${data.description}`,
                    type: `${data.type}`,
                    images: `${data.images}`,
                    relatives: `${data.relatives}`,
                    strength: `${data.strength}`,
                    intelligence: `${data.intelligence}`,
                    cost: `${data.cost}`,
                })
            } catch (err) {
                const error = err.response.data.message
                setError(error)  
            }

        }
        fetchCharacter()
    }, [characterId])


    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            await axios.put(`/api/characters/${characterId}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            navigate(`/characters/${characterId}`)
        } catch (err) {
            const error = err.response.data.message
            setError(error)
        }
    }

    return <div className="section">
        <p>{error}</p>
        <div className="container">

            <h1 className="title">Edit Character</h1>
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input
                            className="input"
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
                            className="input"
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
                            className="input"
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
                            className="input"
                            type="text"
                            name={'images'}
                            onChange={handleChange}
                            value={formData.images}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Relatives</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'relatives'}
                            onChange={handleChange}
                            value={formData.relatives}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Strength</label>
                    <div className="control">
                        <input
                            className="input"
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
                            className="input"
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
                            className="input"
                            type="text"
                            name={'cost'}
                            onChange={handleChange}
                            value={formData.cost}
                        />
                    </div>
                </div>
                <button className="button">Submit</button>
            </form>
            <Link to={`/characters/${characterId}`} className='button is-warning' >Back to {formData.name}</Link>
        </div>
    </div>
}