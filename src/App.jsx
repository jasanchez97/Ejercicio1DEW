import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Home from './pages/Home'
import Categories from './pages/Categories/Categories'
import CategoryDetail from './pages/CategoryDetail/CategoryDetail'
import About from './pages/About'
import MealDetail from './pages/MealDetail/MealDetail'
import './App.css'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:categoryName" element={<CategoryDetail />} />  {/* ← Nueva ruta */}
        <Route path="/about" element={<About />} />
        <Route path="/meal/:id" element={<MealDetail />} />
      </Routes>
    </div>
  )
}

export default App