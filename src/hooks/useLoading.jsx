import { useState, useCallback } from 'react'

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingTimeout, setLoadingTimeout] = useState(null)

  const startLoading = useCallback(() => {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout)
    }
    
    setIsLoading(true)
    
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 5000) 

    setLoadingTimeout(timeout)
  }, [loadingTimeout])

  const stopLoading = useCallback(() => {
    if (loadingTimeout) {
      clearTimeout(loadingTimeout)
      setLoadingTimeout(null)
    }
    
    setIsLoading(false)
  }, [loadingTimeout])

  return { isLoading, startLoading, stopLoading }
}