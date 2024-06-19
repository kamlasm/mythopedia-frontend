import { Link } from "react-router-dom"

const Home = () => {
    return <div className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="subtitle mb-5">
            Welcome to our Gods page, lets learn a bit more of the greek Gods
          </h1>
          <h2 className="title">
          ⚡GODS⚡
          </h2>
          <div className="buttons is-centered" >
          <Link to="/signup" className="button is-primary">Sign Up</Link>
          <Link to="/login" className="button is-primary">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  }
  
  export default Home