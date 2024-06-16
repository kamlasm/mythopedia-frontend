import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { isAddedBy } from '../lib/auth'

const Character = () => {
  const navigate = useNavigate()

  const { characterId } = useParams()
  const [character, setCharacter] = useState({})

  useEffect(() => {
    async function fetchCharacter() {
      const resp = await fetch(`/api/characters/${characterId}`)
      const data = await resp.json()
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

  return <div className="section">
    <div className="container">
      <h1 className="title">{character.name}</h1>
      <h2 className="subtitle">{character.type}</h2>
      <h2 className="subtitle">{character.description}</h2>
      <img src={character.images.regular} alt={character.name} />
    </div>
  </div>
}

export default Character
