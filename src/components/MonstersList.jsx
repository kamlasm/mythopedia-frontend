import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { isAdmin } from '../lib/auth'

const MonsterList = () => {
    const [monsters, setMonsters] = useState([])
    const [error, setError] = useState('')
    const [monsterFilter, setMonsterFilter] = useState('')
    const [orderBy, setOrderBy] = useState('name')
    const [order, setOrder] = useState('asc')


    async function fetchMonsters() {
        try {
            const token = localStorage.getItem('token')
            const resp = await axios.get('/api/monsters', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setMonsters(resp.data)
        } catch (err) {
            const error = err.response.data.message
            setError(error)
        }
    }
    useEffect(() => {
        fetchMonsters()
    }, [])

    function handleInput(e) {
        setMonsterFilter(e.target.value)
    }

    function filterMonsters() {
        const filteredMonsters = monsters.filter(monsters => {
                const name = monsters.name.toLowerCase()
                const filterText = monsterFilter.toLowerCase()
                return name.includes(filterText)
            })
        return filteredMonsters
    }

    function sortMonsters() {
        const sortedMonsters = structuredClone(filterMonsters())
        sortedMonsters.sort((a, b) => {
            if (orderBy === 'name') {
                if (order === 'asc') {
                    return a.name.localeCompare(b.name)
                } else {
                    return b.name.localeCompare(a.name)
                }
            } else if (orderBy === 'level') {
                if (order === 'asc') {
                    return a.level - b.level
                } else {
                    return b.level - a.level
                }
            }
            return 0
        })
        return sortedMonsters
    }
    function handleOrder(orderByField){
        if (orderBy === orderByField) {
            setOrder(order === 'asc'? 'desc':'asc')
        } else{
            setOrderBy(orderByField)
            setOrder('asc')
        }
    }

    function getSortIndicator(field) {
        if (orderBy === field) {
            return order === 'asc' ? '▲' : '▼';
        }
        return '';
    }
    function resetHandler(){
        
        setError('')
        setMonsterFilter('')
        setOrderBy('name')
        setOrder('asc')
        
      }


    if (monsters.length < 1) {
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
            <div className="field">
                <input className='input' placeholder='Search your monsters here' onChange={handleInput}></input>
            </div>
            <div className='buttons'>
            <button className='button' onClick={() => handleOrder('name')}>Sort by Name{getSortIndicator('name')}</button>
            <button className='button' onClick={() => handleOrder('level')}>Sort by Level{getSortIndicator('level')}</button>
            <button className='button' onClick={resetHandler}>Reset</button>
            {isAdmin() &&<Link to="/monsters/newMonster" className="button is-primary">Add Monsters</Link>}
            </div>
            <div className="container">
                <div className="columns is-multiline is-mobile">
                    {sortMonsters().map((monster) => {
                        return <div
                            className="column is-one-third-desktop is-half-tablet is-half-mobile"
                            key={monster.name}
                        >
                            <Link to={`/monsters/${monster.name}`}>
                                <div className="card">
                                    <div className="card-content">
                                        <div className="media">
                                            <div className="media-content">
                                                <h2 className="title is-4">
                                                    {monster.name}
                                                </h2>
                                                <p className="subtitle is-4">
                                                    Level: {monster.level}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-image">
                                        <figure className="image is-4by3">
                                            <img src={monster.image} alt={monster.name} />
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

export default MonsterList