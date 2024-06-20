import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { isAdmin } from '../lib/auth'

export default function CharacterList() {

  const [characters, setCharacters] = useState([])
  const [error, setError] = useState('')
  const [characterFilter, setCharacterFilter] = useState('')
  const [charactersType, setCharactersType] = useState("")
  const [orderBy, setOrderBy] = useState('name')
  const [order, setOrder] = useState('asc')

  async function fetchCharacters() {
    try {
      const resp = await axios.get('/api/characters')
      setCharacters(resp.data)
    } catch (err) {
      const error = err.response.data.message
      setError(error)
    }
  }
  useEffect(() => {
    fetchCharacters()
  }, [])

  function handleInput(e) {
    setCharacterFilter(e.target.value)
  }

  function filterCharacters() {
    const filteredCharacters = characters.filter(
      character => {
        const name = character.name.toLowerCase()
        const filterText = characterFilter.toLowerCase()
        return name.includes(filterText)
          && (charactersType === '' || character.type === charactersType)
      })
    return filteredCharacters
  }

  function sortCharacters() {
    const sortedCharacters = structuredClone(filterCharacters())
    sortedCharacters.sort((a, b) => {
      if (orderBy === 'name') {
        if (order === 'asc') {
          return a.name.localeCompare(b.name)
        } else {
          return b.name.localeCompare(a.name)
        }
      }
      return 0
    })
    return sortedCharacters
  }

  function handleOrder(orderByField) {
    if (orderBy === orderByField) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setOrderBy(orderByField)
      setOrder('asc')
    }
  }
  function getSortIndicator(field) {
    if (orderBy === field) {
      return order === 'asc' ? '▲' : '▼'
    }
    return ''
  }

  function getCharacterType(e) {
    const charactersType = e.target.value
    setCharactersType(charactersType)
  }

  function resetHandler() {
    setCharactersType('')
    setCharacterFilter('')
    setOrderBy('name')
    setOrder('asc')
  }

  if (characters.length < 1) {
    return <div className="section">
      <div className="container">
        <div className="title">
          {error ? error : "Loading ..."}
        </div>
      </div>
    </div>
  }

  return <div className="section">
    <div className="container">

      <div className='buttons'>
        <button value="God" onClick={getCharacterType} className='button'>God</button>
        <button value="Titan" onClick={getCharacterType} className='button'>Titan</button>
        <button value="Hero" onClick={getCharacterType} className='button'>Hero</button>
        <button className='button' onClick={() => handleOrder('name')}>Sort by Name {getSortIndicator('name')}</button>
        <button onClick={resetHandler} className='button'>Reset</button>
        {isAdmin() && <Link to="/characters/newCharacter" className="button is-primary">Add Character</Link>}
      </div>

      <div className="field">
        <input className='input' placeholder='Search your character here' onChange={handleInput} value={characterFilter}></input>
      </div>

      <div className="container">
        <div className="columns is-multiline is-mobile">
          {sortCharacters().map((character) => {
            return <div
              className="column is-one-third-desktop is-half-tablet is-half-mobile"
              key={character.name}
            >
              <Link to={`/characters/${character.name}`}>
                <div className="card">
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <h2 className="title is-4">
                          {character.name}
                        </h2>
                        <p className="subtitle is-4">
                          {character.type}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={character.images} alt={character.name} />
                    </figure>
                  </div>
                </div>
              </Link>
            </div>
          })}
        </div>
      </div>

    </div>
  </div>
}