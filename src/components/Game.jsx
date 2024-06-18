import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const Team = () => {
    const navigate = useNavigate()

    const [team, setTeam] = useState([])
    const [money, setMoney] = useState(0)
    const [strength, setStrength] = useState(0)
    const [intelligence, setIntelligence] = useState(0)
    const [level, setLevel] = useState(0)

    const [isHidden, setIsHidden] = useState(true)
    const [winner, setWinner] = useState("")

    const [monster, setMonster] = useState({})
    const [error, setError] = useState("")

    async function fetchUser() {
        try {
            const token = localStorage.getItem('token')
            const resp = await fetch('/api/your-team', { headers: { Authorization: `Bearer ${token}` } })
            const data = await resp.json()
            const gameplay = data.gameplay
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

    async function fetchMonster() {
        try {
            const token = localStorage.getItem('token')
            const resp = await fetch('/api/monster', { headers: { Authorization: `Bearer ${token}` } })
            const data = await resp.json()
            setMonster(data)
            setIsHidden(true)
        } catch (err) {
            const error = err.response.data.message
            setError(error)
        }
    }

    useEffect(() => {
        fetchUser()
        fetchMonster()
    }, [])

    async function playHandle() {
        setIsHidden(false)
        if (strength > monster.strength && intelligence > monster.intelligence) {
            const winner = true
            setWinner(winner)

            let newLevel = level
            if (level < 6) {
                newLevel = level + 1
                setLevel(newLevel)
            }

            const newMoney = money + 50
            setMoney(newMoney)

            const token = localStorage.getItem('token')
            await axios.put('api/game', { newMoney, newLevel }, {
                headers: { Authorization: `Bearer ${token}` }
            })

        } else {
            const winner = false
            setWinner(winner)
        }
    }

    async function nextLevelHandle() {
        await fetchUser()
        await fetchMonster()
    }

    async function handleReset() {
        navigate('/your-team')
        const newMoney = 100
        setMoney(newMoney)
        const newStrength = 0
        setStrength(newStrength)
        const newIntelligence = 0
        setIntelligence(newIntelligence)
        const newLevel = 1
        setLevel(newLevel)
        const newTeam = []
        setTeam(newTeam)

        const token = localStorage.getItem('token')
        await axios.put('api/your-team', { newMoney, newLevel, newStrength, newIntelligence, newTeam }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setIsHidden(true)
        setWinner(false)
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
        <h3>Level: {level}</h3>

        {isHidden && <div>
            <button className="button is-primary" onClick={playHandle}>Play</button>
            <Link to='/your-team' className="button is-warning">Rebuild Team</Link>
        </div>}
        {isHidden ? ""
            : winner && level === 6 ? <div>
                <p className="has-background-success-light has-text-primary-dark">Congratulations, you win the game! Reset and play again.</p>
                <button className="button is-primary " onClick={handleReset}>Reset</button>
            </div>
                : winner ? <div>
                    <p className="has-background-success-light has-text-primary-dark">Congratulations, your team is the best! Try the next level.</p>
                    <button className="button is-primary " onClick={nextLevelHandle}>Next Level</button>
                </div>
                    : <div>
                        <p className="has-background-danger-light has-text-danger">Buuuuu, your team is the worst! Go back and rebuild your team.</p>
                        <Link className="button is-primary" to="/your-team">Try again</Link>
                    </div>}
        <div>
            <h2 className="title">Team Members</h2>
            <div className="columns is-multiline is-mobile">
                {team.map((character) => {
                    return <div className="column is-one-third-desktop is-half-tablet is-half-mobile"
                        key={character.name}>
                        <div className="card">
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-content">
                                        <p>{character.name}</p>
                                        {/* <figure className="image is-128x128">
                           <img src={character.images.regular} alt={character.name}/>
                       </figure> */}

                                        <p>Cost: {character.cost}</p>
                                        <p>Strength: {character.strength}</p>
                                        <p>Intelligence: {character.intelligence}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
        <div>
            <h1 className="title">Monster Level {monster.level}</h1>
            {/* <figure className="image is-128x128">
                           <img src={monster.image} alt={monster.name}/>
                       </figure> */}
                       
            <p className="subtitle">{monster.name}</p>
            <p>Strength: {isHidden ? "???" : monster.strength}</p>
            <p>Intelligence: {isHidden ? "???" : monster.intelligence}</p>
        </div>
    </>

}

export default Team