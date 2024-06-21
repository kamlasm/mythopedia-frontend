import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {baseUrl} from '../config'

export default function Team() {

    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

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
            const resp = await axios.get(`${baseUrl}/your-team`, {
                headers: { Authorization: `Bearer ${token}` }
            })
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

    async function fetchMonster() {
        try {
            const token = localStorage.getItem('token')
            const resp = await axios.get(`${baseUrl}/monster`, { headers: { Authorization: `Bearer ${token}` } })
            const data = resp.data
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
            try {
                const token = localStorage.getItem('token')
                await axios.put(`${baseUrl}/game`, { newMoney, newLevel }, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            } catch (err) {
                const error = err.response.data.message
                setError(error)
            }

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
        try {
            const token = localStorage.getItem('token')
            await axios.put(`${baseUrl}/your-team`, { newMoney, newLevel, newStrength, newIntelligence, newTeam }, {
                headers: { Authorization: `Bearer ${token}` }
            })
        } catch (err) {
            const error = err.response.data.message
            setError(error)
        }
        setIsHidden(true)
        setWinner(false)
    }

    function startBattle() {
        let timerInterval;
        MySwal.fire({
            title: "<strong>Battle in progress!<strong>",
            html: <div>
                <img src="https://i0.wp.com/the-past.com/wp-content/uploads/2021/03/post-1_image0-253-scaled.jpg?resize=400%2C256&ssl=1" />
                <ul>{team.map(teamMember => {
                    return <li key={teamMember.name}><strong>{teamMember.name}</strong></li>
                })}</ul> versus <div><strong>{monster.name}</strong></div>
            </div>,
            timer: 3000,
            timerProgressBar: false,
            allowOutsideClick: false,
            didOpen: () => {
                MySwal.showLoading();
                timerInterval = setInterval(() => {
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then(() => {
            playHandle()
        });
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

    return <div className="section">
        <p>{error}</p>
        <h1 className="title is-size-1 has-text-centered">Let the battle begin!</h1>
        <div className="columns is-centered has-text-centered team-page">
            <div className="column is-two-thirds-desktop">
                {isHidden ? ""
                    : winner && level === 6 ? <div className="box has-background-success-light">
                        <h3 className="title is-4 mt-4 has-text-success">Congratulations, you win the game! Reset and play again.</h3>
                        <button className="button is-primary " onClick={handleReset}>Reset</button>
                    </div>
                        : winner ? <div className="box has-background-success-light ">
                            <h3 className="title is-4 mt-4 has-text-success">Congratulations, your team is the best! Try the next level.</h3>
                            <button className="button is-primary " onClick={nextLevelHandle}>Next Level</button>
                        </div>
                            : <div className="box has-background-danger-light">
                                <h3 className="title is-4 mt-4 has-text-danger">Buuuuu, your team is the worst! Go back and rebuild your team.</h3>
                                <Link className="button is-danger" to="/your-team">Try again</Link>
                            </div>}
            </div>
        </div>

        <div className="container is-widescreen">
            <div className="fixed-grid has-3-cols has-1-cols-mobile">
                <div className="grid">
                    <div className="cell">
                        <div className="container team-page">
                            <h1 className="title">Your Team</h1>
                            <h3>Money: {money}</h3>
                            <h3>Team Strength: {strength}</h3>
                            <h3>Team Intelligence: {intelligence}</h3>
                            {isHidden && <div>
                                <div className="buttons">
                                    <button className="button is-primary" onClick={startBattle}>Play</button>
                                    <Link to='/your-team'><button className="button is-warning">Rebuild Team</button></Link>
                                </div>
                            </div>}
                        </div>

                        <div className="container team-page">
                            <h2 className="title is-4">Team Members</h2>
                            <div className="columns is-multiline is-mobile">
                                {team.map((character) => {
                                    return <div className="column is-four-fifths-desktop is-two-thirds-tablet is-two-thirds-mobile"
                                        key={character.name}>
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="media">
                                                    <div className="media-content">
                                                        <h2 className="title is-5">{character.name}</h2>
                                                        <figure className="image is-128x128">
                                                            <img src={character.images} alt={character.name} className="image is-128x128" />
                                                        </figure>
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
                    </div>

                    <div className="cell">
                        <h1 className="title">Versus</h1>
                    </div>

                    <div className="cell">
                        <div className="container team-page">
                            <h1 className="title">Monster - Level {monster.level}</h1>
                            <div className="columns is-multiline is-mobile">
                                <div className="column is-four-fifths-desktop is-two-thirds-tablet is-two-thirds-mobile">
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="media">
                                                <div className="media-content">
                                                    <h2 className="title is-5">{monster.name}</h2>
                                                    <figure className="image is-128x128">
                                                        <img src={monster.image} alt={monster.name} />
                                                    </figure>
                                                    <p>Strength: {isHidden || !winner ? "???" : monster.strength}</p>
                                                    <p>Intelligence: {isHidden || !winner ? "???" : monster.intelligence}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}