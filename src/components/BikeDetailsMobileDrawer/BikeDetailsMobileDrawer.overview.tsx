import React, { useEffect, useState } from 'react'
import { Box, Divider, Typography, useTheme } from '@mui/material'
import { Drawer } from 'vaul'
import BikeImageSelector from 'components/BikeImageSelector'
import BikeSpecs from 'components/BikeSpecs'
import BikeType from 'components/BikeType'
import { BookingButton, FavoriteFilledIcon, FavoriteIcon, LikeButton, PriceRow } from './BikeDetailsMobileDrawer.styles'
import BookingAddressMap from 'components/BookingAddressMap'
import { SetActivePage } from './types'
import { addFavourite, isFavourite, removeFavourite } from 'utils/favourites'

interface BikeDetailsOverviewProps {
    id: number;
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
    id,
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
    const [isFav, setIsFav] = useState(isFavourite(id));

    useEffect(() => {
        setIsFav(isFavourite(id));
    }, [id]);

    const handleFavouriteClick = () => {
        if (isFav) {
            removeFavourite(id);
        } else {
            addFavourite(id);
        }
        setIsFav(!isFav);
    };

    return (
        <Drawer.Content
            aria-labelledby="bike-details-title"
            aria-describedby="bike-details-description"
            style={{
                backgroundColor: '#f3f4f6',
                display: 'flex',
                flexDirection: 'column',
                borderTopLeftRadius: '30px',
                borderTopRightRadius: '30px',
                marginTop: '96px',
                height: 'fit-content',
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                outline: 'none'
            }}>
            <div style={{
                position: 'relative',
                paddingTop: '8px',
                backgroundColor: 'white',
                borderTopLeftRadius: '30px',
                borderTopRightRadius: '30px',
                flex: 1
            }}>
                <div style={{
                    margin: '0 auto',
                    width: '48px',
                    height: '6px',
                    flexShrink: 0,
                    borderRadius: '9999px',
                    backgroundColor: '#d1d5db',
                    marginBottom: '32px'
                }} />
                <div style={{ display: 'none', position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}>
                    <Drawer.Title >Bike Details</Drawer.Title>
                    <Drawer.Description>
                        Detailed information about the bike, including images, specifications, and booking details.
                    </Drawer.Description>
                </div>
                <div style={{ position: 'relative', padding: '16px' }}>
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
                    <LikeButton onClick={handleFavouriteClick}>
                        {isFav ? <FavoriteFilledIcon sx={{ color: 'white' }} /> : <FavoriteIcon sx={{ color: 'white' }} />}
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