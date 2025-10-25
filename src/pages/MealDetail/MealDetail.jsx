import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import './MealDetail.css'

function MealDetail() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // MISMA función que en Home.jsx para obtener precios
  const getPrice = (mealId) => {
    const savedPrices = localStorage.getItem('mealPrices')
    const prices = savedPrices ? JSON.parse(savedPrices) : {}
    return prices[mealId]
  }

  const fetchMealDetail = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      
      if (!response.ok) {
        throw new Error('Error al cargar los detalles del plato')
      }
      
      const data = await response.json()
      
      if (!data.meals || data.meals.length === 0) {
        throw new Error('Plato no encontrado')
      }
      
      const mealData = data.meals[0]
      // Usar el precio persistente (misma lógica que Home.jsx)
      const persistentPrice = getPrice(mealData.idMeal)
      
      setMeal({
        ...mealData,
        price: persistentPrice
      })
      
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMealDetail()
  }, [id])

  if (isLoading) {
    return (
      <div className="page-content">
        <Loading type="content" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-content">
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
          <Link to="/" className="back-link">← Volver al menú</Link>
        </div>
      </div>
    )
  }

  if (!meal) {
    return (
      <div className="page-content">
        <div className="error">
          <h2>Plato no encontrado</h2>
          <Link to="/" className="back-link">← Volver al menú</Link>
        </div>
      </div>
    )
  }

  // Extraer ingredientes y medidas
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`].trim() !== '') {
      ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`] || ''
      })
    }
  }

  return (
    <div className="page-content">
      <Link to="/" className="back-link">← Volver al menú</Link>
      
      <div className="meal-detail">
        <div className="meal-header">
          <div className="meal-image">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
          </div>
          <div className="meal-info">
            <h1>{meal.strMeal}</h1>
            <p className="meal-category"><strong>Categoría:</strong> {meal.strCategory}</p>
            <p className="meal-area"><strong>Origen:</strong> {meal.strArea}</p>
            <p className="meal-tags"><strong>Etiquetas:</strong> {meal.strTags || 'No especificadas'}</p>
            <div className="meal-price">
              <strong>Precio: </strong>
              <span className="price">${meal.price}</span>
            </div>
          </div>
        </div>

        <div className="meal-content">
          <div className="ingredients-section">
            <h2>Ingredientes</h2>
            <ul className="ingredients-list">
              {ingredients.map((item, index) => (
                <li key={index}>
                  <span className="ingredient">{item.ingredient}</span>
                  {item.measure && <span className="measure"> - {item.measure}</span>}
                </li>
              ))}
            </ul>
          </div>

          <div className="instructions-section">
            <h2>Instrucciones</h2>
            <div className="instructions">
              {meal.strInstructions.split('\n').map((step, index) => (
                step.trim() && (
                  <p key={index} className="instruction-step">
                    {step}
                  </p>
                )
              ))}
            </div>
          </div>

          {meal.strYoutube && (
            <div className="video-section">
              <h2>Video Tutorial</h2>
              <div className="video-container">
                <a 
                  href={meal.strYoutube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="video-link"
                >
                  ▶ Ver video en YouTube
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MealDetail