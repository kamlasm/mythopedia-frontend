import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getPayload, isAdmin } from '../lib/auth'


const Character = () => {
  const navigate = useNavigate()

  const { characterName } = useParams()
  const [character, setCharacter] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const resp = await axios.get(`/api/characters/${characterName}`)
        getPayload()
        setCharacter(resp.data)
      } catch (err) {
        const error = err.response.data.message || 'Error fetching character'
        setError(error)
      }

    }
    fetchCharacter()
  }, [characterName])

  async function handleDelete() {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`/api/characters/${characterName}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/characters')
    } catch (err) {
      const error = err.response.data.message || 'Error deleting character'
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
      <h1 className="title is-1">{character.name}</h1>
      <h2 className="subtitle is-3">{character.type}</h2>
      <h2 className="subtitle">{character.description}</h2>
      <div className='columns'>
        {character.relatives.father && (
          <div className='column'>
            <p>Father:</p>
            <Link to={`/characters/${character.relatives.father}`}>
              {character.relatives.father}
            </Link>
          </div>
        )}
        {character.relatives.mother && (
          <div className='column'>
            <p>Mother:</p>
            <Link to={`/characters/${character.relatives.mother}`}>
              {character.relatives.mother}
            </Link>
          </div>
        )}
        {character.relatives.spouses?.length > 0 && (
          <div className='column'>
            <p>Spouses:</p>
            {character.relatives.spouses.map((spouse, index) => (
              <Link key={index} to={`/characters/${spouse}`}>
                {spouse}
              </Link>
            ))}
          </div>
        )}
        {character.relatives.lovers?.length > 0 && (
          <div className='column'>
            <p>Lovers:</p>
            {character.relatives.lovers.map((lover, index) => (
              <Link key={index} to={`/characters/${lover}`}>
                {lover}
              </Link>
            ))}
          </div>
        )}
        {character.relatives.children?.length > 0 && (
          <div className='column'>
            <p>Children:</p>
            <ul>
              {character.relatives.children.map((child, index) => (
                <li key={index}>
                  <Link to={`/characters/${child}`}>
                    {child}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {character.relatives.siblings?.length > 0 && (
          <div className='column'>
            <p>Siblings:</p>
            <ul>
              {character.relatives.siblings.map((sibling, index) => (
                <li key={index}>
                  <Link to={`/characters/${sibling}`}>
                    {sibling}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <figure class="image is-center">
        <img src={character.images} alt={character.name} />
      </figure>
      <div className='buttons'>
        {isAdmin() && <button className='button is-danger' onClick={handleDelete}>Delete</button>}
        {isAdmin() && <Link to={`/characters/${character.name}/editCharacter`} className='button is-warning' >Edit</Link>}

        <Link to='/characters' className='button is-primary' >Back to Character List</Link>
      </div>
    </div>
  </div>
}

export default Character
