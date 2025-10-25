import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  return (
    <nav className="navbar">
      <img 
        className="logoRestaurant" 
        src="/img/restaurantLogoDesign.webp" 
        alt="Logo del Restaurante" 
      />
      <div className="navbarmenu">
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/categories">Categorías</Link>
        </li>
        <li>
          <Link to="/about">Sobre nosotros</Link>
        </li>
      </ul>
      </div>
    </nav>
  )
}

export default NavBar