import React from 'react'
import { HomePageLink, ThankYouPageWrapper } from './RentBike.styles'
import { Typography } from '@mui/material'
import BikeType from 'components/BikeType'
import { Paths } from 'routes/paths'


interface RentBikeThankYouProps {
    name: string;
    imageUrl: string;
    type: string;
    isMobileScreen?: boolean;
}
const RentBikeThankYou = ({ name, imageUrl, type, isMobileScreen = false }: RentBikeThankYouProps) => {
    return (
        <ThankYouPageWrapper>
            <Typography variant='h2' fontSize={24} marginBottom={2} fontWeight={800}>
                Thank You
            </Typography>
            <Typography variant='body1' fontSize={16} marginBottom={1.5} fontWeight={600}>
                Your bike is booked.
            </Typography>
            <img
                src={imageUrl}
                width={185}
                height={105}
                alt={name}
                style={{ marginBottom: '1.5rem' }}
            />
            <Typography
                variant='h4'
                fontSize={18}
                fontWeight={700}
                marginBottom={0.5}
                textAlign={'center'}
                data-testid='bike-name-details'
            >
                {name}
            </Typography>

            <BikeType type={type} />
            {
                isMobileScreen &&
                <HomePageLink
                    href={Paths.HOME}
                    data-testid='bike-booking-link'
                    onClick={(e) => {
                        if (window.location.pathname === Paths.HOME) {
                            e.preventDefault();
                            window.location.reload();
                        }
                    }}
                >
                    Go to Home Page
                </HomePageLink>
            }
        </ThankYouPageWrapper>
    )
}

export default RentBikeThankYou