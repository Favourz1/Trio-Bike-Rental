import React from 'react'
import { Box, Divider, Link, Typography } from '@mui/material'
import {
    BookingButton,
    InfoIcon,
    OverviewContainer,
    PriceRow,
} from './RentBike.styles'
import { getServicesFee } from './RentBike.utils'
import DatePicker from 'components/DatePicker'

interface RentBikeProps {
    rateByDay: number
}

const RentBike = ({ rateByDay }: RentBikeProps) => {
    const servicesFee = getServicesFee(rateByDay)
    const total = rateByDay + servicesFee

    return (
        <div>
            <OverviewContainer variant='outlined' data-testid='bike-overview-container'>

                <Typography variant='h2' fontSize={16} marginBottom={1.25}>
                    Booking Overview
                </Typography>

                <Divider />

                <PriceRow marginTop={1.75} data-testid='bike-overview-single-price'>
                    <Box display='flex' alignItems='center'>
                        <Typography marginRight={1}>Subtotal</Typography>
                        <InfoIcon fontSize='small' />
                    </Box>

                    <Typography>{rateByDay} €</Typography>
                </PriceRow>

                <PriceRow marginTop={1.5} data-testid='bike-overview-single-price'>
                    <Box display='flex' alignItems='center'>
                        <Typography marginRight={1}>Service Fee</Typography>
                        <InfoIcon fontSize='small' />
                    </Box>

                    <Typography>{servicesFee} €</Typography>
                </PriceRow>

                <PriceRow marginTop={1.75} data-testid='bike-overview-total'>
                    <Typography fontWeight={800} fontSize={16}>
                        Total
                    </Typography>
                    <Typography variant='h2' fontSize={24} letterSpacing={1}>
                        {total} €
                    </Typography>
                </PriceRow>

                <BookingButton
                    fullWidth
                    disableElevation
                    variant='contained'
                    data-testid='bike-booking-button'
                >
                    Add to booking
                </BookingButton>
            </OverviewContainer>
        </div>
    )
}

export default RentBike