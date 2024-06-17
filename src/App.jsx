import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import CharacterList from './components/CharacterList'
import Navbar from './components/Navbar'
import ShowCharacter from './components/ShowCharacter'
import Signup from './components/Signup'
import Login from './components/Login'

function App() {
  return <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/characters" element={<CharacterList />} />
      <Route path="/characters/:characterId" element={<ShowCharacter />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
}

export default App