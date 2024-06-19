import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const CharacterList = () => {
  const [characters, setCharacters] = useState([])
  const [error, setError] = useState('')
  const [characterFilter, setCharacterFilter] = useState('')
  const [charactersType, setCharactersType] = useState("")
  

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

  function handleInput(e){
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

  function getCharacterType(e) {
    const charactersType = e.target.value
    setCharactersType(charactersType)
  }
  function resetHandler(){
    setCharactersType('')
    setCharacterFilter('')
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
    
      <button value="God" onClick={getCharacterType} className='button'>God</button>
      <button value="Titan" onClick={getCharacterType} className='button'>Titan</button>
      <button value="Hero" onClick={getCharacterType} className='button'>Hero</button>
      <button onClick={resetHandler} className='button'>Reset</button>
      <input className='input' placeholder='Search your character here' onChange={handleInput}></input>
      <div className="columns is-multiline is-mobile">
        {filterCharacters().map((character)=> {
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
}

export default CharacterList