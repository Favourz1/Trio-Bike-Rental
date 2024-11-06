import BikeImageList from 'components/BikeImageList'
import { BikeImage, Circle, CircleContainer, Container } from './BikeImageSelector.styles'
import BikePlaceholder from 'assets/bike-placeholder.png'
import { useMediaQuery, useTheme } from '@mui/material'

interface BikeImageSelectorComponentProps {
  selectedImageUrl: string
  selectedImageIndex: number
  imageUrls: string[]
  isImageLoaded: boolean
  handleSelectImage: (imageUrl: string, index: number) => void
  handleIsImageLoaded: (newStatus: boolean) => void
}

const BikeImageSelector = ({
  selectedImageUrl,
  selectedImageIndex,
  imageUrls,
  isImageLoaded,
  handleIsImageLoaded,
  handleSelectImage,
}: BikeImageSelectorComponentProps) => {
  const theme = useTheme()
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Container data-testid='bike-image-selector'>
      {!isMobileScreen &&
        <BikeImageList
          selectedImageUrl={selectedImageUrl}
          selectedImageIndex={selectedImageIndex}
          imageUrls={imageUrls}
          handleSelectImage={handleSelectImage}
        />}

      {!isImageLoaded && (
        <img
          src={BikePlaceholder}
          width='100%'
          height='100%'
          alt="Bigger bike's image Placeholder"
        />
      )}

      <BikeImage
        isLoaded={isImageLoaded}
        key={selectedImageUrl}
        src={selectedImageUrl}
        width={'100%'}
        height='100%'
        alt="Bigger bike's image"
        data-testid='bike-selected-image'
        onLoadStart={() => handleIsImageLoaded(false)}
        onLoad={() => handleIsImageLoaded(true)}
      />

      {isMobileScreen && (
        <CircleContainer>
          {imageUrls.map((_, index) => (
            <Circle
              key={index}
              isSelected={index === selectedImageIndex}
              onClick={() => handleSelectImage(imageUrls[index], index)}
            />
          ))}
        </CircleContainer>
      )}
    </Container>
  )
}

export default BikeImageSelector
