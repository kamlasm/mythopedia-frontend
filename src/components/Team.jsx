import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Team = () => {

    const [team, setTeam] = useState([])
    const [money, setMoney] = useState(0)
    const [strength, setStrength] = useState(0)
    const [intelligence, setIntelligence] = useState(0)
    const [level, setLevel] = useState(0)

    const [characters, setCharacters] = useState([])

    const [error, setError] = useState('')

    async function fetchUser() {
        try {
            const token = localStorage.getItem('token')
            const resp = await axios.get('/api/your-team', { headers: { Authorization: `Bearer ${token}` } })
            const gameplay = resp.data.gameplay
            setTeam(gameplay.team)
            setMoney(gameplay.money)
            setStrength(gameplay.totalStrength)
            setIntelligence(gameplay.totalIntelligence)
            setLevel(gameplay.level)
        } catch (err) {
            const error = err.response.data.message
            setError(error)
        }
    }

    async function fetchCharacters() {
        try {
            const resp = await axios.get('/api/characters')
            const charactersPlayable = resp.data.filter(character => {
                return character.isPlayable
            })
            setCharacters(charactersPlayable)
        } catch (err) {
            const error = err.response.data.message
            setError(error)
        }
    }

    useEffect(() => {
        fetchUser()
        fetchCharacters()
    }, [])

    async function handleAdd(character) {
        if (character.cost > money) {
            setError('not enough money')
        } else {
            const newTeam = structuredClone(team)
            newTeam.push(character)
            setTeam(newTeam)
            const newMoney = money - character.cost
            setMoney(newMoney)
            const newStrength = strength + character.strength
            setStrength(newStrength)
            const newIntelligence = intelligence + character.intelligence
            setIntelligence(newIntelligence)
            const newLevel = level
            try {
                const token = localStorage.getItem('token')
                await axios.put('api/your-team', { newMoney, newStrength, newIntelligence, newTeam, newLevel }, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            } catch (err) {
                const error = err.response.data.message
                setError(error)
            }
        }
    }

    async function handleRemove(character, index) {

        const newTeam = structuredClone(team)
        newTeam.splice(index, 1)
        setTeam(newTeam)
        const newMoney = money + character.cost
        setMoney(newMoney)
        const newStrength = strength - character.strength
        setStrength(newStrength)
        const newIntelligence = intelligence - character.intelligence
        setIntelligence(newIntelligence)
        const newLevel = level
        try {
            const token = localStorage.getItem('token')
            await axios.put('api/your-team', { newMoney, newStrength, newIntelligence, newTeam, newLevel }, {
                headers: { Authorization: `Bearer ${token}` }
            })
        } catch (err) {
            const error = err.response.data.message
            setError(error)
        }
    }


    if (level < 1) {
        return <div className="section">
            <div className="container">
                <div className="title">
                    {error ? error : "Loading ..."}
                </div>
            </div>
        </div>
    }

    return <>
        <p>{error}</p>
        <h1 className="title">Your Team</h1>
        <h3>Money: {money}</h3>
        <h3>Team Strength: {strength}</h3>
        <h3>Team Intelligence: {intelligence}</h3>
        <Link to="/game" className="button is-primary">Start the Game</Link>

        <div>
            <h2 className="title">Team Members</h2>
            <div className="columns is-multiline is-mobile">
                {team.map((character, index) => {
                    return <div className="column is-one-third-desktop is-half-tablet is-half-mobile"
                        key={character.name}>
                        <div className="card">
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p>{character.name}</p>
                                        {/* <figure className="image is-128x128">
                           <img src={character.images} alt={character.name}/>
                       </figure> */}

                                        <p>Cost: {character.cost}</p>
                                        <p>Strength: {character.strength}</p>
                                        <p>Intelligence: {character.intelligence}</p>
                                        <button className="button is-primary" onClick={() => handleRemove(character, index)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>

        </div>

        <div>
            <h2 className="title">Options</h2>
            <div className="columns is-multiline is-mobile">
                {characters.map((character) => {
                    return <div className="column is-one-third-desktop is-half-tablet is-half-mobile"
                        key={character._id}>
                        <div className="card">
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <h2 className="title is-4">{character.name}</h2>
                                        {/* <figure className="image is-128x128">
                        <img src={character.images} alt={character.name}/>
                    </figure> */}

                                        <p>Cost: {character.cost}</p>
                                        <p>Strength: {character.strength}</p>
                                        <p>Intelligence: {character.intelligence}</p>
                                        <button className="button is-primary" onClick={() => handleAdd(character)}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </>

}

export default Team