import React, { createContext, useContext, useState, useEffect } from 'react'

const PriceContext = createContext()

export const usePriceContext = () => {
  const context = useContext(PriceContext)
  if (!context) {
    throw new Error('usePriceContext debe usarse dentro de PriceProvider')
  }
  return context
}

export const PriceProvider = ({ children }) => {
  const [prices, setPrices] = useState(() => {
    const savedPrices = localStorage.getItem('mealPrices')
    return savedPrices ? JSON.parse(savedPrices) : {}
  })

  const getPrice = (mealId) => {
    return prices[mealId]
  }

  const setPrice = (mealId, price) => {
    const newPrices = { ...prices, [mealId]: price }
    setPrices(newPrices)
    localStorage.setItem('mealPrices', JSON.stringify(newPrices))
  }

  const value = {
    prices,
    getPrice,
    setPrice
  }

  return (
    <PriceContext.Provider value={value}>
      {children}
    </PriceContext.Provider>
  )
}