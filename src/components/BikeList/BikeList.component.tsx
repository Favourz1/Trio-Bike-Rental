import Bike from 'models/Bike'
import { getQuantityLabel } from './BikeList.utils'
import BikeCard from 'components/BikeCard'
import BikeCardSkeleton from 'components/BikeCard/BikeCard.skeleton'
import { Container, ListContainer, QuantityContainer } from './BikeList.styles'
import { Typography } from '@mui/material'

interface BikeListProps {
  bikes: Bike[];
  isLoadingBikes?: boolean;
}

const BikeList = ({ bikes, isLoadingBikes }: BikeListProps) => {
  const quantityLabel = getQuantityLabel(bikes.length)

  return (
    <Container data-testid='bikes-list'>
      <QuantityContainer className='list-quantity-container'>
        <Typography color='primary.light' data-testid='list-quantity'>
          {quantityLabel}
        </Typography>
      </QuantityContainer>

      <ListContainer>
        {isLoadingBikes ? (
          Array.from({ length: 10 }).map((_, index) => (
            <BikeCardSkeleton key={index} />
          ))
        ) : (
          bikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))
        )}
      </ListContainer>
    </Container>
  )
}

export default BikeList
