import Bike from 'models/Bike'
import { getQuantityLabel } from './BikeList.utils'
import BikeCard from 'components/BikeCard'
import BikeCardSkeleton from 'components/BikeCard/BikeCard.skeleton'
import { Container, FilterCancelIcon, FilterIcon, FilterIconWrapper, ListContainer, QuantityContainer } from './BikeList.styles'
import { Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import { getFavourites } from 'utils/favourites'

interface BikeListProps {
  bikes: Bike[];
  isLoadingBikes?: boolean;
}

const BikeList = ({ bikes, isLoadingBikes }: BikeListProps) => {
  const [showFavourites, setShowFavourites] = useState(false);
  const quantityLabel = getQuantityLabel(bikes.length);

  const favouriteBikes = bikes.filter(bike => getFavourites().includes(bike.id));
  const displayedBikes = showFavourites ? favouriteBikes : bikes;

  return (
    <Container data-testid='bikes-list'>
      <QuantityContainer className='list-quantity-container'>
        <Typography color='primary.light' data-testid='list-quantity'>
          {quantityLabel}
        </Typography>
        <Tooltip title={showFavourites ? 'Show All Bikes' : 'Show Favorite Bikes'}>
          <FilterIconWrapper onClick={() => setShowFavourites(!showFavourites)}>
            {showFavourites ? <FilterCancelIcon /> : <FilterIcon />}
          </FilterIconWrapper>
        </Tooltip>

      </QuantityContainer>

      <ListContainer>
        {isLoadingBikes ? (
          Array.from({ length: 10 }).map((_, index) => (
            <BikeCardSkeleton key={index} />
          ))
        ) : (
          displayedBikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))
        )}
      </ListContainer>
    </Container>
  )
}

export default BikeList
