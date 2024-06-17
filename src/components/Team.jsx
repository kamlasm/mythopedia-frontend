import { useState, useEffect} from "react"
import { getPayload } from "../lib/auth"
import axios from "axios"


const Team = () => {
    const [team, setTeam] = useState([])
    const [money, setMoney] = useState(100)
    const [strength, setStrength] = useState(0)
    const [intelligence, setIntelligence] = useState(0)

    const user = getPayload()
    console.log(user)

    
    const [characters, setCharacters] = useState([])
      
      
        useEffect(() => {
          async function fetchCharacters() {
            const resp = await fetch('/api/characters')
            const data = await resp.json()
            const charactersPlayable = data.filter(character => {
                return character.isPlayable
            })
            setCharacters(charactersPlayable)
          }
          fetchCharacters()
        }, [])
    
        console.log(money)
    async function handleAdd(character) {
        if (character.cost > money) {
            console.log('not enough money')
        } else {
            const newTeam = structuredClone(team) 
            newTeam.push(character)
            setTeam(newTeam)
            setMoney(money - character.cost)
            setStrength(strength + character.strength)
            setIntelligence(intelligence + character.intelligence)

            // const token = localStorage.getItem('token')
            // await axios.put('api/your-team', {money, strength, intelligence, team}, {
            //     headers: { Authorization: `Bearer ${token}` }
            // })
        }
    }

    

    return <>
        <h1 className="title">Your Team</h1>
        <h3>Money: {money}</h3>
        <h3>Team Strength: {strength}</h3>
        <h3>Team Intelligence: {intelligence}</h3>

        <div>
            <h2 className="title">Team Members</h2>
        </div>

        <div>
            <h2 className="title">Options</h2>
            <div className="columns is-multiline is-mobile">
            {characters.map((character) => {
                return <div className="column is-one-third-desktop is-half-tablet is-half-mobile"
                key={character.name}>
                    <p>{character.name}</p>
                    {/* <figure className="image is-128x128">
                        <img src={character.images.regular} alt={character.name}/>
                    </figure> */}

                    <p>Cost: {character.cost}</p>
                    <p>Strength: {character.strength}</p>
                    <p>Intelligence: {character.intelligence}</p>
                    <button className="button is-primary" onClick={() => handleAdd(character)}>Add</button>
                </div>
            })}
            </div>
        </div>
    </>

}

export default Team