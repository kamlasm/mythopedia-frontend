import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const CharacterList = () => {
  const [characters, setCharacters] = useState([])


  useEffect(() => {
    async function fetchCharacters() {
      const resp = await fetch('/api/characters')
      const data = await resp.json()
      setCharacters(data)
    }
    fetchCharacters()
  }, [])



  return <div className="section">
    <div className="container">

      <div className="columns is-multiline is-mobile">
        {characters.map((character) => {
          return <div
            className="column is-one-third-desktop is-half-tablet is-half-mobile"
            key={character}
          >
            <Link to={`/characters/${character._id}`}>
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
                    <img src={character.images.regular} alt={character.name} />
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