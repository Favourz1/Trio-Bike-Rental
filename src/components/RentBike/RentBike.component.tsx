import React, { useEffect, useState, useCallback } from 'react'
import { Box, Divider, Link, Typography } from '@mui/material'
import {
    BookingButton,
    CircularProgressIcon,
    DatePickerWrapper,
    InfoIcon,
    OverviewContainer,
    PriceRow,
} from './RentBike.styles'
import { debounce, getInitialAmountDataState } from './RentBike.utils'
import DatePicker from 'components/DatePicker'
import Bike from 'models/Bike'
import apiClient from 'services/api'

interface RentBikeProps {
    bike?: Bike
}
type SelectedDateType = { from: Date; to: Date }
type AmountDataType = {
    rentAmount?: number;
    fee?: number;
    totalAmount?: number;
}

const RentBike = ({ bike }: RentBikeProps) => {

    const [selectedDate, setSelectedDate] = useState<SelectedDateType>({ from: new Date(), to: new Date() });
    const [amountData, setAmountData] = useState<AmountDataType>(getInitialAmountDataState(bike as Bike));
    const [isLoadingAmount, setIsLoadingAmount] = useState<boolean>(false);


    const getBikeAmount = useCallback(debounce(async () => {
        try {
            if (!bike) return;
            setIsLoadingAmount(true)
            const response = await apiClient.post('/bikes/amount', {
                bikeId: bike?.id || 0,
                userId: 1863, // Defaulting to this user on my candidate because no login api to create login UI and get dynamic id
                dateFrom: selectedDate.from.toISOString().split('T')[0],
                dateTo: selectedDate.to.toISOString().split('T')[0]
            })
            setAmountData(response.data)
        } catch (error) {
            console.error('Error fetching bike amount:', error);
        } finally {
            setIsLoadingAmount(false)
        }
    }, 500), [selectedDate, bike]);

    useEffect(() => {
        getBikeAmount();
    }, [selectedDate, bike, getBikeAmount]);


    console.log('bike')
    console.log(bike)


    return (
        <div>
            <OverviewContainer variant='outlined' data-testid='bike-overview-container'>
                <DatePickerWrapper>
                    <Typography variant='h1' fontSize={24} marginBottom={1}>
                        Select date and time
                    </Typography>
                    <DatePicker
                        isInverted={true}
                        setExternalState={setSelectedDate}
                    />
                </DatePickerWrapper>
                <Typography variant='h2' fontSize={16} marginBottom={1.25}>
                    Booking Overview
                </Typography>

                <Divider />

                <PriceRow marginTop={1.75} data-testid='bike-overview-single-price'>
                    <Box display='flex' alignItems='center'>
                        <Typography marginRight={1}>Subtotal</Typography>
                        <InfoIcon fontSize='small' />
                    </Box>
                    <Typography>{isLoadingAmount ? <CircularProgressIcon size={14} /> : amountData.rentAmount} €</Typography>
                </PriceRow>

                <PriceRow marginTop={1.5} data-testid='bike-overview-single-price'>
                    <Box display='flex' alignItems='center'>
                        <Typography marginRight={1}>Service Fee</Typography>
                        <InfoIcon fontSize='small' />
                    </Box>

                    <Typography> {isLoadingAmount ? <CircularProgressIcon size={14} /> : amountData.fee} €</Typography>
                </PriceRow>

                <PriceRow marginTop={1.75} data-testid='bike-overview-total'>
                    <Typography fontWeight={800} fontSize={16}>
                        Total
                    </Typography>
                    <Typography variant='h2' fontSize={24} letterSpacing={1}>
                        {isLoadingAmount ? <CircularProgressIcon size={14} /> : amountData.totalAmount} €
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