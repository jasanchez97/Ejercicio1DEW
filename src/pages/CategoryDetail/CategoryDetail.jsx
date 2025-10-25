import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import MenuList from '../../components/MenuList/MenuList'
import Loading from '../../components/Loading/Loading'
import './CategoryDetail.css'

function CategoryDetail() {
  const { categoryName } = useParams()
  const [meals, setMeals] = useState([])
  const [category, setCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Función para precios persistentes (misma que Home.jsx)
  const getOrSetPrice = (mealId) => {
    const savedPrices = localStorage.getItem('mealPrices')
    const prices = savedPrices ? JSON.parse(savedPrices) : {}
    
    if (prices[mealId]) {
      return prices[mealId]
    }
    
    const newPrice = Math.floor(Math.random() * 20) + 5
    const newPrices = { ...prices, [mealId]: newPrice }
    localStorage.setItem('mealPrices', JSON.stringify(newPrices))
    
    return newPrice
  }

  const fetchCategoryMeals = async () => {
    try {
      // Primero obtener los platos de la categoría
      const mealsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
      
      if (!mealsResponse.ok) {
        throw new Error('Error al cargar los platos de la categoría')
      }
      
      const mealsData = await mealsResponse.json()
      
      if (!mealsData.meals) {
        throw new Error('No se encontraron platos en esta categoría')
      }

      // Luego obtener información detallada de la categoría
      const categoriesResponse = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      const categoriesData = await categoriesResponse.json()
      
      const categoryInfo = categoriesData.categories?.find(
        cat => cat.strCategory === categoryName
      )

      // Asignar precios persistentes a cada plato
      const mealsWithPrices = mealsData.meals.map(meal => ({
        ...meal,
        price: getOrSetPrice(meal.idMeal)
      }))

      setMeals(mealsWithPrices)
      setCategory(categoryInfo)
      
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategoryMeals()
  }, [categoryName])

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
          <Link to="/categories" className="back-link">← Volver a categorías</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-content">
      <Link to="/categories" className="back-link">← Volver a categorías</Link>
      
      <div className="category-detail">
        {category && (
          <div className="category-header">
            <div className="category-info">
              <h1 className="category-title">{category.strCategory}</h1>
              <p className="category-description">{category.strCategoryDescription}</p>
            </div>
            <div className="category-image">
              <img src={category.strCategoryThumb} alt={category.strCategory} />
            </div>
          </div>
        )}

        <div className="category-meals">
          <h2>Platos de {categoryName}</h2>
          {meals.length > 0 ? (
            <MenuList meals={meals} />
          ) : (
            <p>No hay platos disponibles en esta categoría</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryDetail