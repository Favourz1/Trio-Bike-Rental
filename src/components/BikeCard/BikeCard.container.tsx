import Bike from 'models/Bike'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paths } from 'routes/paths'
import BikeCard from './BikeCard.component'
import { useMediaQuery, useTheme } from '@mui/material'
import BikeDetailsMobileDrawer from 'components/BikeDetailsMobileDrawer'

interface BikeCardProps {
  bike: Bike
}

const BikeCardContainer = ({ bike }: BikeCardProps) => {
  const theme = useTheme()
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'))

  const [openMobileDrawer, setOpenMobileDrawer] = useState<boolean>(false);


  const navigate = useNavigate()

  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleOpenBikeDetails = () => {
    if (isMobileScreen) {
      setOpenMobileDrawer(true);
    } else {
      navigate(Paths.BIKE_DETAILS, { state: { bike } })
    }
  }

  const handleIsImageLoaded = (isLoading: boolean) => {
    setIsImageLoaded(isLoading)
  }

  return (
    <>
      <BikeCard
        id={bike.id}
        isImageLoaded={isImageLoaded}
        handleIsImageLoaded={handleIsImageLoaded}
        handleOpenBikeDetails={handleOpenBikeDetails}
        name={bike.name}
        type={bike.type}
        bodySize={bike.bodySize}
        description={bike.description}
        imageUrls={bike.imageUrls}
        cardImage={bike.imageUrls[0] || ''}
        rate={bike.rate}
      />

      {openMobileDrawer &&
        <BikeDetailsMobileDrawer
          bike={bike}
          open={openMobileDrawer}
          setOpen={setOpenMobileDrawer}
        />}
    </>
  )
}

export default BikeCardContainer
