import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getPayload, isAdmin } from '../lib/auth'


const Character = () => {
  const navigate = useNavigate()

  const { characterId } = useParams()
  const [character, setCharacter] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const resp = await axios.get(`/api/characters/${characterId}`)
        getPayload()
        setCharacter(resp.data)
      } catch (err) {
        const error = err.response.data.message
        setError(error)
      }

    }
    fetchCharacter()
  }, [characterId])

  async function handleDelete() {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`/api/characters/${characterId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/characters')
    } catch (err) {
      const error = err.response.data.message
      setError(error)
    }
  }

  if (!character.name) {
    return <div className="section">
      <div className="container">
        <div className="title">
          Loading ...
        </div>
      </div>
    </div>
  }

  return <div className="section">
    <p>{error}</p>
    <div className="container">
      <h1 className="title">{character.name}</h1>
      <h2 className="subtitle">{character.type}</h2>
      <h2 className="subtitle">{character.description}</h2>
      <figure class="image is-center">
      <img src={character.images} alt={character.name} />
      </figure>
      <div  className='buttons'>
      {isAdmin() && <button className='button is-danger' onClick={handleDelete}>Delete</button>}
      {isAdmin() && <Link to={`/characters/${character._id}/editCharacter`} className='button is-warning' >Edit</Link>}
      
      <Link to='/characters' className='button is-primary' >Back to Character List</Link>
    </div>
    </div>

  </div>
}

export default Character
