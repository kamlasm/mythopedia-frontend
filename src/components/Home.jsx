import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

const Home = () => {

  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'))

  useEffect(()=>{
    setIsLoggedIn(localStorage.getItem('token'))
  },[location])

  return <div className="hero is-fullheight-with-navbar">
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title">
          ⚡MYTHOPEDIA⚡
        </h1>
        <div className="container has-text-centered">
        <h1 className="subtitle mb-5">
          Welcome to Mythopedia, the place to learn about Greek mythology.
        </h1>
        <h1 className="subtitle mb-5">
          If you're up to the challenge, sign up to create a team of gods to battle against the deadliest monsters of Greek mythology.
        </h1>
        </div>
        <div className="buttons is-centered" >
          {!isLoggedIn && <Link to="/signup" className="button is-primary">Sign Up</Link>}
          {!isLoggedIn && <Link to="/login" className="button is-primary">Log In</Link>}
        </div>
      </div>
    </div>
  </div>
}

export default Home