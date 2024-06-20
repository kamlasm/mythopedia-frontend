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
  const [allCharacters, setAllCharacters] = useState([])

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const characterResp  = await axios.get(`/api/characters/${characterName}`)
        getPayload()
        setCharacter(characterResp.data)
        const allCharactersResp = await axios.get('/api/characters')
        setAllCharacters(allCharactersResp.data)
      } catch (err) {
        const error = err.response.data.message || 'Error fetching character'
        setError(error)
      }

    }
    fetchCharacter()
  }, [characterName])

  function relativeExists(name){
    return allCharacters.some(character => character.name === name)
  }

  function ShowParents(name, relation) {
    if (!name|| name==="") return null
    return (
      <div className='column'>
        <p>{relation}:</p>
        {relativeExists(name) ? (
          <Link to={`/characters/${name}`}>{name}</Link>
        ) : (
          <p>{name}</p>
        )}
      </div>
    )
  }

  function ShowOtherRelatives(relatives, relation) {
    if (!relatives || relatives.length === 0) return null
    return (
      <div className='column'>
        <p>{relation}:</p>
        <ul>
          {relatives.map((relative, index) => (
            <li key={index}>
              {relativeExists(relative) ? (
                <Link to={`/characters/${relative}`}>{relative}</Link>
              ) : (
                <p>{relative}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }


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

  return (
    <div className="section">
      <p>{error}</p>
      <div className="container">
        <h1 className="title is-1">{character.name}</h1>
        <h2 className="subtitle is-3">{character.type}</h2>
        <h3 className='subtitle is-4'>{character.isImmortal}</h3>
        <h2 className="subtitle">{character.description}</h2>
        <div className='columns'>
          {ShowParents(character.relatives.father, 'Father')}
          {ShowParents(character.relatives.mother, 'Mother')}
          {ShowOtherRelatives(character.relatives.spouses, 'Spouses')}
          {ShowOtherRelatives(character.relatives.lovers, 'Lovers')}
          {ShowOtherRelatives(character.relatives.children, 'Children')}
          {ShowOtherRelatives(character.relatives.siblings, 'Siblings')}
        </div>
        <figure className="image is-center">
          <img src={character.images} alt={character.name} />
        </figure>
        <div className='buttons'>
          {isAdmin() && (
            <>
              <button className='button is-danger' onClick={handleDelete}>
                Delete
              </button>
              <Link
                to={`/characters/${character.name}/editCharacter`}
                className='button is-warning'
              >
                Edit
              </Link>
            </>
          )}
          <Link to='/characters' className='button is-primary'>
            Back to Character List
          </Link>
        </div>
      </div>
    </div>
  )
}


export default Character
