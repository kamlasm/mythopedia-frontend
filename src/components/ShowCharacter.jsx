import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getPayload, isAdmin } from '../lib/auth'


const Character = () => {
  const navigate = useNavigate()

  const { characterId } = useParams()
  const [character, setCharacter] = useState({})

  useEffect(() => {
    async function fetchCharacter() {
      const resp = await fetch(`/api/characters/${characterId}`)
      const data = await resp.json()
      getPayload()
      setCharacter(data)
    }
    fetchCharacter()
  }, [characterId])

  if (!character.name) {
    return <div className="section">
      <div className="container">
        <div className="title">
          Loading ...
        </div>
      </div>
    </div>
  }


  async function handleDelete() {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`/api/characters/${characterId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/characters')
    } catch (err) {
      console.log(err.response.data);
    }
  }

  return <div className="section">
    <div className="container">
      <h1 className="title">{character.name}</h1>
      <h2 className="subtitle">{character.type}</h2>
      <h2 className="subtitle">{character.description}</h2>
      <img src={character.images.regular} alt={character.name} />
      {isAdmin() && <button className='button is-danger' onClick={handleDelete}>Delete</button>}
      {isAdmin() && <Link to={`/characters/${character._id}/editCharacter`} className='button is-warning' >Edit</Link>}
    </div>

  </div>
}

export default Character
