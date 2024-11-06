import Bike from 'models/Bike'
import { useEffect, useState } from 'react'
import apiClient from 'services/api'
import Home from './Home.component'
import { BOILERPLATE_CANDIDATE_TOKEN } from 'config'
import { Toaster } from 'sonner'

const HomeContainer = () => {
  const [bikes, setBikes] = useState<Bike[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getAllBikes = async () => {
      setLoading(true)
      try {
        const response = await apiClient.get('/bikes')
        setBikes(response.data)
      } catch (error) {
        console.error('Failed to fetch bikes:', error)
      } finally {
        setLoading(false)
      }
    }

    getAllBikes()
  }, [])

  return <>
    <Toaster position="top-center" richColors closeButton />

    <Home appIsNotConfigured={!BOILERPLATE_CANDIDATE_TOKEN} bikes={bikes} isLoadingBikes={loading} />
  </>
}

export default HomeContainer
