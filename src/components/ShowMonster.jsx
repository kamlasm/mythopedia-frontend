import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getPayload, isAdmin } from '../lib/auth'


const Monster = () => {
  const navigate = useNavigate()

  const { monsterName } = useParams()
  const [monster, setMonster] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchMonster() {
      try {
        const token = localStorage.getItem('token')
        const monsterResp  = await axios.get(`/api/monsters/${monsterName}`,{
          headers: { Authorization: `Bearer ${token}` }
        })
        getPayload()
        setMonster(monsterResp.data)
      } catch (err) {
        const error = err.response.data.message || 'Error fetching monster'
        setError(error)
      }

    }
    fetchMonster()
  }, [monsterName])


  async function handleDelete() {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`/api/monsters/${monsterName}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/monsters')
    } catch (err) {
      const error = err.response.data.message || 'Error deleting monster'
      setError(error)
    }
  }

  if (!monster.name) {
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
        <h1 className="title is-1">{monster.name}</h1>
        <h2 className="subtitle is-3">Level: {monster.level}</h2>
        <h2 className="subtitle">{monster.description}</h2>
        <div class="box">
        <figure className="image is-center">
          <img src={monster.image} alt={monster.name} />
        </figure>
        </div>
        <div className='buttons'>
          {isAdmin() && (
            <>
              <button className='button is-danger' onClick={handleDelete}>
                Delete
              </button>
              <Link
                to={`/monsters/${monster.name}/editMonster`}
                className='button is-warning'
              >
                Edit
              </Link>
            </>
          )}
          <Link to='/monsters' className='button is-primary'>
            Back to Monster List
          </Link>
        </div>
      </div>
    </div>
  )
}


export default Monster
