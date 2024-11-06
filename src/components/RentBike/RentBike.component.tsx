import React, { useEffect, useState, useCallback } from 'react'
import { Box, Dialog, Divider, Typography, useMediaQuery, useTheme } from '@mui/material'
import {
    BookingButton,
    CalendarDrawerTriggerWrapper,
    CalendarMonthStyledIcon,
    CircularProgressIcon,
    DatePickerWrapper,
    InfoIcon,
    OverviewContainer,
    PriceRow,
    SelectDateButton,
} from './RentBike.styles'
import { debounce, formatDateToDDMMYY, formatSelectedDate, getInitialAmountDataState } from './RentBike.utils'
import DatePicker from 'components/DatePicker'
import Bike from 'models/Bike'
import apiClient from 'services/api'
import Tooltip from '@mui/material/Tooltip';
import { toast } from 'sonner';
import axios from 'axios';
import RentBikeThankYou from './RentBike.thanks'
import BikePlaceholder from 'assets/bike-placeholder.png'
import { Drawer } from 'vaul'




interface RentBikeProps {
    bike?: Bike;
    showCalendarAsDrawer?: boolean;
    showThankYouInDialog?: boolean;
}
type SelectedDateType = { from: Date; to: Date }
type AmountDataType = {
    rentAmount?: number;
    fee?: number;
    totalAmount?: number;
}

const RentBike = ({ bike, showCalendarAsDrawer = false, showThankYouInDialog = false }: RentBikeProps) => {
    const theme = useTheme()
    const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'))

    const [selectedDate, setSelectedDate] = useState<SelectedDateType>({ from: new Date(), to: new Date() });
    const [amountData, setAmountData] = useState<AmountDataType>(getInitialAmountDataState(bike as Bike));
    const [isLoadingAmount, setIsLoadingAmount] = useState<boolean>(false);
    const [isBookingBike, setIsBookingBike] = useState<boolean>(false);
    const [showBikeBookedPage, setShowBikeBookedPage] = useState<boolean>(false);


    const getBikeAmount = useCallback(debounce(async () => {
        try {
            if (!bike) return;
            setIsLoadingAmount(true)

            const response = await apiClient.post('/bikes/amount', {
                bikeId: bike?.id || 0,
                userId: 1863, // Defaulting to this user on my candidate because no login api to create login UI and get dynamic id
                dateFrom: formatSelectedDate(selectedDate.from),
                dateTo: formatSelectedDate(selectedDate.to)
            })
            setAmountData(response.data)
        } catch (error: unknown) {
            const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : 'Failed to fetch bike amount for selected date.';
            // console.log(error);
            console.error('Error fetching bike amount:', errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoadingAmount(false)
        }
    }, 500), [selectedDate, bike]);

    const handleBikeRental = useCallback(async () => {
        try {
            if (!bike) return;
            if (!selectedDate) {
                toast.info('Please select a date first');
                return;
            }
            setIsBookingBike(true)
            await apiClient.post('/bikes/rent', {
                bikeId: bike?.id || 0,
                userId: 1863, // Defaulting to this user on my candidate because no login api to create login UI and get dynamic id
                dateFrom: formatSelectedDate(selectedDate.from),
                dateTo: formatSelectedDate(selectedDate.to)
            })
            setShowBikeBookedPage(true)
            toast.success(`${bike.name} has been booked`);
        } catch (error: unknown) {
            const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
                ? error.response.data.message
                : 'Failed to book bike.';
            // console.log(error);
            console.error('Error booking bike:', errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsBookingBike(false)
        }
    }, []);

    const handleCloseThankYouDialog = useCallback(() => {
        setShowBikeBookedPage(false);
    }, []);

    useEffect(() => {
        getBikeAmount();
    }, [selectedDate, bike, getBikeAmount]);

    return (
        <OverviewContainer variant='outlined' data-testid='bike-overview-container'>
            {
                !showBikeBookedPage ? <>
                    <DatePickerWrapper>
                        <Typography variant='h1' fontSize={24} marginBottom={1}>
                            Select date and time
                        </Typography>
                        {
                            showCalendarAsDrawer ?
                                <Drawer.Root>
                                    <Drawer.Trigger >
                                        <CalendarDrawerTriggerWrapper>
                                            <CalendarMonthStyledIcon />
                                            <Typography>
                                                From {formatDateToDDMMYY(selectedDate?.from ?? '')} to {formatDateToDDMMYY(selectedDate?.to ?? '')}
                                            </Typography>
                                        </CalendarDrawerTriggerWrapper>

                                    </Drawer.Trigger>
                                    <Drawer.Portal>
                                        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                                        <Drawer.Content className="flex flex-col rounded-t-[30px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none" style={{ backgroundColor: theme.palette.primary.main }}>
                                            <div className="relative p-4 rounded-t-[30px] flex-1 min-h-max" style={{ backgroundColor: theme.palette.primary.main }}>
                                                <div aria-hidden className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
                                                {/* <Drawer.Title className="font-medium mb-4 text-gray-900">Drawer for React.</Drawer.Title> */}

                                                <Box marginBottom="1rem">
                                                    <DatePicker
                                                        isInverted={true}
                                                        setExternalState={setSelectedDate}
                                                        defaultDate={selectedDate}
                                                    />
                                                </Box>
                                                <Drawer.Close style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                    <SelectDateButton
                                                        fullWidth
                                                        disableElevation
                                                        variant='contained'
                                                        color='secondary'
                                                        data-testid='bike-booking-button'
                                                        sx={{ color: 'black', marginTop: 0 }}
                                                    >
                                                        Select
                                                    </SelectDateButton>
                                                </Drawer.Close>
                                            </div>

                                        </Drawer.Content>
                                    </Drawer.Portal>
                                </Drawer.Root>
                                :
                                <DatePicker
                                    isInverted={true}
                                    setExternalState={setSelectedDate}
                                />
                        }
                    </DatePickerWrapper>
                    <Typography variant='h2' fontSize={16} marginBottom={1.25}>
                        Booking Overview
                    </Typography>

                    <Divider />

                    <PriceRow marginTop={1.75} data-testid='bike-overview-single-price'>
                        <Box display='flex' alignItems='center'>
                            <Typography marginRight={1}>Subtotal</Typography>
                            <Tooltip title='Rental rate for selected days'>
                                <InfoIcon fontSize='small' />
                            </Tooltip>
                        </Box>
                        <Typography>{isLoadingAmount ? <CircularProgressIcon size={14} /> : amountData.rentAmount} €</Typography>
                    </PriceRow>

                    <PriceRow marginTop={1.5} data-testid='bike-overview-single-price'>
                        <Box display='flex' alignItems='center'>
                            <Typography marginRight={1}>Service Fee</Typography>
                            <Tooltip title='Service charge for your experience.'>
                                <InfoIcon fontSize='small' />
                            </Tooltip>
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
                        disabled={isBookingBike}
                        onClick={handleBikeRental}
                    >
                        {isBookingBike && <CircularProgressIcon size={14} color='info' />}
                        Add to booking
                    </BookingButton>
                </> :
                    showThankYouInDialog ? (
                        <Dialog open={showBikeBookedPage} onClose={handleCloseThankYouDialog}
                            disableEnforceFocus disableRestoreFocus
                        >
                            <div className='px-8 py-6'>
                                <RentBikeThankYou
                                    name={bike?.name || ''}
                                    imageUrl={bike?.imageUrls[0] || BikePlaceholder}
                                    type={bike?.type || ''}
                                    isMobileScreen={isMobileScreen}
                                />
                            </div>
                        </Dialog>
                    ) : (
                        <RentBikeThankYou
                            name={bike?.name || ''}
                            imageUrl={bike?.imageUrls[0] || BikePlaceholder}
                            type={bike?.type || ''}
                            isMobileScreen={isMobileScreen}
                        />
                    )
            }
        </OverviewContainer>
    )
}
export default RentBike