import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Home() {

  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'))

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('token'))
  }, [location])

  return <div className="hero is-fullheight-with-navbar home">
    <div className="hero-body">
      <div className="container is-max-desktop has-text-centered home-text-div">
        <h1 className="title is-1">
          ⚡MYTHOPEDIA⚡
        </h1>
        
        <div className="container has-text-centered">
          <h1 className="subtitle mb-5 home-subtext">
            Welcome to Mythopedia, the place to learn about Greek mythology.
          </h1>
          <h1 className="subtitle mb-5 home-subtext">
            If you're up to the challenge, sign up to create a team of gods to battle against the deadliest monsters of Greek mythology.
          </h1>
        </div>

        <div className="buttons is-centered" >
          {!isLoggedIn && <Link to="/signup" className="button is-dark">Sign Up</Link>}
          {!isLoggedIn && <Link to="/login" className="button is-dark">Log In</Link>}
        </div>

      </div>
    </div>
  </div>
}