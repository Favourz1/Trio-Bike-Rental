import Bike from 'models/Bike'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BikeDetails from './BikeDetails.component'
import { Toaster } from 'sonner'

type StateReceived = {
  bike: Bike
}

const BikeDetailsContainer = () => {
  const { state } = useLocation()

  const [currentBikeData, setCurrentBikeData] = useState<Bike>()

  useEffect(() => {
    if (state) {
      const { bike } = state as StateReceived
      setCurrentBikeData(bike)
    }
  }, [])

  return <>
    <Toaster position="top-center" richColors closeButton />
    <BikeDetails bike={currentBikeData} />
  </>
}

export default BikeDetailsContainer
