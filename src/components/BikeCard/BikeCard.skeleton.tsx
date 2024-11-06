import { Divider, Skeleton, Typography } from '@mui/material'
import {
  Container,
  Header,
  Footer,
  Name,
  ImageContainer,
} from './BikeCard.styles'

const BikeCardSkeleton = () => {
  return (
    <Container variant='outlined' data-testid='bike-card-skeleton'>
      <Header action={<Skeleton variant="circular" width={40} height={40} />} />

      <div>
        <ImageContainer>
          <Skeleton variant="rectangular" width='100%' height={150} />
        </ImageContainer>

        <Name data-testid='bike-name-skeleton'>
          <Skeleton variant="text" width="60%" />
        </Name>

        <Typography letterSpacing={1} data-testid='bike-price-day-skeleton'>
          <Skeleton variant="text" width="40%" />
        </Typography>
        <Divider />

        <Footer
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          data-testid='card-footer-skeleton'
        >
          <Skeleton variant="text" width="60%" />

          <Typography letterSpacing={1} data-testid='bike-price-day-skeleton'>
            <Skeleton variant="text" width="40px" />
          </Typography>
        </Footer>
      </div>
    </Container>
  )
}

export default BikeCardSkeleton