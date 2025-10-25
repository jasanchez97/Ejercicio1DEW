import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import './Categories.css'

function Categories() {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchCategories = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      
      if (!response.ok) {
        throw new Error('Error al cargar categorías')
      }
      
      const data = await response.json()
      setCategories(data.categories || [])
      
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className="page-content">
      <h1 className="page-title">Categorías</h1>
      
      {isLoading ? (
        <Loading type="content" />
      ) : error ? (
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div className="categories-grid">
          {categories.map(category => (
            <Link 
              key={category.idCategory} 
              to={`/category/${category.strCategory}`}
              className="category-card-link"
            >
              <div className="category-card">
                <img src={category.strCategoryThumb} alt={category.strCategory} />
                <h3 className="category-title">{category.strCategory}</h3>
                <p className="category-description">
                  {category.strCategoryDescription?.substring(0, 100)}...
                </p>
                <div className="view-category">Ver platos →</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Categories