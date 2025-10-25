import { useState, useCallback } from 'react'

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingTimeout, setLoadingTimeout] = useState(null)

  const startLoading = useCallback(() => {
    // Limpiar timeout anterior si existe
    if (loadingTimeout) {
      clearTimeout(loadingTimeout)
    }
    
    setIsLoading(true)
    
    // Timeout de seguridad para evitar loading permanente
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 5000) // Máximo 5 segundos
    
    setLoadingTimeout(timeout)
  }, [loadingTimeout])

  const stopLoading = useCallback(() => {
    // Limpiar timeout
    if (loadingTimeout) {
      clearTimeout(loadingTimeout)
      setLoadingTimeout(null)
    }
    
    setIsLoading(false)
  }, [loadingTimeout])

  return { isLoading, startLoading, stopLoading }
}