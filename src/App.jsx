import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import CharacterList from './components/CharacterList'
import MonstersList from './components/MonstersList'
import Navbar from './components/Navbar'
import ShowCharacter from './components/ShowCharacter'
import Signup from './components/Signup'
import Login from './components/Login'
import AddCharacter from './components/AddCharacter'
import EditCharacter from './components/EditCharacter'
import Team from './components/Team'
import Game from './components/Game'
import './App.css'

function App() {
  return <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/characters" element={<CharacterList />} />
      <Route path="/monsters" element={<MonstersList />} />
      <Route path="/characters/:characterName" element={<ShowCharacter />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/characters/newCharacter" element={< AddCharacter/>} />
      <Route path="/characters/:characterName/editCharacter" element={< EditCharacter/>} />
      <Route path="/your-team" element={< Team/>} />
      <Route path="/game" element={< Game/>} />
      <Route path="/*" element="Page doesn't exist"/>
    </Routes>
  </Router>
}

export default App