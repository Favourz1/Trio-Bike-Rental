import React from 'react'
import { Box, Divider, Typography, useTheme } from '@mui/material'
import { Drawer } from 'vaul'
import BikeImageSelector from 'components/BikeImageSelector'
import BikeSpecs from 'components/BikeSpecs'
import BikeType from 'components/BikeType'
import { BookingButton, FavoriteIcon, LikeButton, PriceRow } from './BikeDetailsMobileDrawer.styles'
import BookingAddressMap from 'components/BookingAddressMap'
import { SetActivePage } from './types'

interface BikeDetailsOverviewProps {
    imageUrls: string[];
    bodySize: number;
    maxLoad: number;
    ratings: number;
    name: string;
    type: string;
    description: string;
    rateByDay: number;
    rateByWeek: number;
    setActivePage: SetActivePage
}

const BikeDetailsOverview = ({
    imageUrls,
    bodySize,
    maxLoad,
    ratings,
    name,
    type,
    description,
    rateByDay,
    rateByWeek,
    setActivePage
}: BikeDetailsOverviewProps) => {
    const theme = useTheme()

    return (
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[30px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
            <div className="relative pt-2 bg-white rounded-t-[30px] flex-1">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
                {/* <Drawer.Title className="font-medium mb-4 text-gray-900">A controlled drawer.</Drawer.Title> */}
                <div className='relative p-4'>
                    {!!imageUrls && <BikeImageSelector imageUrls={imageUrls} />}
                    <Box sx={{ position: 'absolute', bottom: '-20%', left: '50%', transform: 'translateX(-50%)', minWidth: '90%' }}>
                        <BikeSpecs bodySize={bodySize} maxLoad={maxLoad} ratings={ratings} />
                    </Box>
                </div>
                <Box bgcolor={theme.palette.primary.main} color={'white'} padding={'1.5rem'}
                    sx={{ borderTopLeftRadius: 24, borderTopRightRadius: 24, minHeight: 300, paddingTop: 8, maxHeight: '50vh', overflowY: 'auto' }}
                    className="scrollbar-hide"
                >
                    <Box>
                        <div>
                            <Typography
                                variant='h4'
                                fontSize={24}
                                fontWeight={800}
                                marginBottom={0.5}
                                data-testid='bike-name-details'
                            >
                                {name}
                            </Typography>
                            <BikeType type={type} />
                        </div>

                        <Typography marginTop={1.5} fontSize={14}>
                            {description}
                        </Typography>
                    </Box>

                    <Box marginY={2.25} data-testid='bike-prices-details'>
                        <PriceRow>
                            <Typography>Day</Typography>
                            <Typography fontWeight={800} fontSize={24} letterSpacing={1}>
                                {rateByDay} €
                            </Typography>
                        </PriceRow>

                        <PriceRow>
                            <Typography>Week</Typography>
                            <Typography fontWeight={800} fontSize={24} letterSpacing={1}>
                                {rateByWeek} €
                            </Typography>
                        </PriceRow>
                    </Box>

                    <Divider />

                    <Box marginTop={3.25} marginBottom={12}>
                        <Typography variant='h1' fontSize={16} fontWeight={800}>
                            Full address after booking
                        </Typography>

                        <BookingAddressMap />
                    </Box>
                </Box>

                {/* Rent button fixed bottom */}
                <Box bgcolor={theme.palette.primary.main} color={'white'} padding={'1.5rem'} display="flex" alignItems="center" gap={3} position="fixed" bottom={0} width="100%" boxShadow="0 -1px 4px rgba(0, 0, 0, 0.2)">
                    <LikeButton>
                        <FavoriteIcon sx={{ color: 'white' }} />
                    </LikeButton>
                    <BookingButton
                        fullWidth
                        disableElevation
                        variant='contained'
                        color='secondary'
                        data-testid='bike-booking-button'
                        sx={{ color: 'black', marginTop: 0 }}
                        onClick={() => setActivePage('booking')}
                    >
                        Rent Bike
                    </BookingButton>

                </Box>
            </div>


        </Drawer.Content>
    )
}

export default BikeDetailsOverview