import React, { useState } from 'react'
import { Box, Dialog, Divider, IconButton, Typography, useTheme } from '@mui/material'
import { Drawer } from 'vaul'
import { Actions, BookingBikeDetailsWrapper, CaretLeftIcon, FavoriteIcon, LikeButton, LocationIcon, LoginButton, MenuIcon, MenuModal, SignUpButton } from './BikeDetailsMobileDrawer.styles'
import { Link } from 'react-router-dom'
import { Paths } from 'routes/paths'
import BikeType from 'components/BikeType'
import RentBike from 'components/RentBike'
import Bike from 'models/Bike'
import { SetActivePage } from './types'

interface BikeDetailsBookingProps {
    bike: Bike;
    setActivePage: SetActivePage
}

const BikeDetailsBooking = ({ bike, setActivePage }: BikeDetailsBookingProps) => {
    const theme = useTheme()
    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false)

    return (
        <>
            <Drawer.Content
                aria-labelledby="bike-details-title"
                aria-describedby="bike-details-description"
                style={{
                    backgroundColor: '#f3f4f6',
                    display: 'flex',
                    flexDirection: 'column',
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
                    flex: 1,
                    minHeight: '100vh',
                    maxHeight: '100vh'
                }}>
                    <div style={{ display: 'none', position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}>
                        <Drawer.Title >Bike Details</Drawer.Title>
                        <Drawer.Description>
                            Detailed information about the bike, including images, specifications, and booking details.
                        </Drawer.Description>
                    </div>
                    <div style={{ position: 'relative', padding: '16px' }}>
                        {/* nav */}
                        <Actions sx={{ marginBottom: '10px' }}>
                            <IconButton
                                onClick={() => setIsNavMenuOpen(true)}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Box display='flex' alignItems='center' data-testid='location-label'>
                                <Typography color='black' marginRight={0.75}>
                                    Manhattan
                                </Typography>

                                <LocationIcon fontSize='small' />
                            </Box>
                        </Actions>
                        <Box display="flex" alignItems="center" gap={6} marginBottom={1.5}>
                            <LikeButton onClick={() => setActivePage('overview')}>
                                <CaretLeftIcon />
                            </LikeButton>

                            <Typography
                                fontWeight={800}
                                fontSize="34px"
                            >
                                Booking
                            </Typography>
                        </Box>
                        <BookingBikeDetailsWrapper>
                            <img src={bike.imageUrls[0]} alt="Bike" style={{ maxWidth: '30%', height: 'auto' }} />
                            <Box display="flex" flexDirection={'column'} justifyContent="center">
                                <div>
                                    <Typography
                                        variant='h5'
                                        fontSize={18}
                                        fontWeight={700}
                                        marginBottom={0.5}
                                        data-testid='bike-name-details'
                                    >
                                        {bike.name}
                                    </Typography>
                                    <Box marginBottom={1}>
                                        <BikeType
                                            type={bike.type}
                                        />
                                    </Box>
                                    <Box display={'flex'} alignItems={'center'}>
                                        <Typography fontWeight={700} fontSize={14} letterSpacing={1}>
                                            {bike.rate} €
                                        </Typography>
                                        /Day
                                    </Box>
                                </div>
                            </Box>
                        </BookingBikeDetailsWrapper>
                        <RentBike bike={bike} showCalendarAsDrawer={true} showThankYouInDialog={true} />
                    </div>
                </div>
            </Drawer.Content>
            <Dialog open={isNavMenuOpen} onClose={() => setIsNavMenuOpen(false)} disableEnforceFocus disableRestoreFocus>
                <MenuModal>
                    <Link to={Paths.LOGIN} data-testid='login-button'>
                        <LoginButton>Log in</LoginButton>
                    </Link>

                    <Link to='/sign-up' data-testid='signup-button'>
                        <SignUpButton variant='contained' color='secondary' disableElevation>
                            Sign up
                        </SignUpButton>
                    </Link>
                </MenuModal>
            </Dialog>
        </>
    )
}

export default BikeDetailsBooking