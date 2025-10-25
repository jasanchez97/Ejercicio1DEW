import React from 'react'
import { Link } from 'react-router-dom'
import './MenuItem.css'

function MenuItem({ meal }) {
  return (
    <Link to={`/meal/${meal.idMeal}`} className="menu-item-link">
      <div className="menu-item">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <h3>{meal.strMeal}</h3>
        <p className="category">Categoría: {meal.strCategory}</p>
        <p className="price">Precio: ${meal.price}</p>
        <div className="view-details">Ver detalles →</div>
      </div>
    </Link>
  )
}

export default MenuItem