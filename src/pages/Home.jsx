import { useState, useEffect } from 'react'
import MenuList from '../components/MenuList/MenuList'
import Loading from '../components/Loading/Loading'

function Home() {
  const [meals, setMeals] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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

  const fetchMeals = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      
      if (!response.ok) {
        throw new Error('Error en la petición: ' + response.status)
      }
      
      const data = await response.json()
      
      if (!data.meals) {
        throw new Error('No se encontraron platos')
      }
      
      const mealsWithPersistentPrices = data.meals.map(meal => ({
        ...meal,
        price: getOrSetPrice(meal.idMeal)
      }))
      
      setMeals(mealsWithPersistentPrices)
      
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMeals()
  }, [])

  return (
    <div className="page-content">
      <h1 className="page-title">Menú del Restaurante</h1>
      
      {isLoading ? (
        <Loading type="content" />
      ) : error ? (
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <MenuList meals={meals} />
      )}
    </div>
  )
}

export default Home