import { useState, useEffect } from 'react'

export const usePersistentPrices = () => {
  const [prices, setPrices] = useState({})

  useEffect(() => {
    const savedPrices = localStorage.getItem('mealPrices')
    if (savedPrices) {
      setPrices(JSON.parse(savedPrices))
    }
  }, [])

  useEffect(() => {
    if (Object.keys(prices).length > 0) {
      localStorage.setItem('mealPrices', JSON.stringify(prices))
    }
  }, [prices])

  const getPrice = (mealId) => {
    return prices[mealId]
  }

  const generatePrice = (mealId) => {
    if (prices[mealId]) {
      return prices[mealId]
    }

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