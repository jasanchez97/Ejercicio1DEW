import { useState, useEffect } from 'react'

export const usePersistentPrices = () => {
  const [prices, setPrices] = useState({})

  // Cargar precios desde localStorage al inicializar
  useEffect(() => {
    const savedPrices = localStorage.getItem('mealPrices')
    if (savedPrices) {
      setPrices(JSON.parse(savedPrices))
    }
  }, [])

  // Guardar precios en localStorage cuando cambien
  useEffect(() => {
    if (Object.keys(prices).length > 0) {
      localStorage.setItem('mealPrices', JSON.stringify(prices))
    }
  }, [prices])

  const getPrice = (mealId) => {
    return prices[mealId]
  }

  const generatePrice = (mealId) => {
    // Si ya existe un precio, devolverlo
    if (prices[mealId]) {
      return prices[mealId]
    }

    // Generar nuevo precio y guardarlo
    const newPrice = Math.floor(Math.random() * 20) + 5
    setPrices(prev => ({
      ...prev,
      [mealId]: newPrice
    }))
    return newPrice
  }

  const getOrGeneratePrice = (mealId) => {
    return prices[mealId] || generatePrice(mealId)
  }

  return {
    prices,
    getPrice,
    generatePrice,
    getOrGeneratePrice
  }
}