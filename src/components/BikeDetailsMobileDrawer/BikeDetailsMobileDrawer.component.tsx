import React, { useEffect, useState } from 'react'
import { Box, Divider, Typography, useTheme } from '@mui/material'
import { Drawer } from 'vaul'
import BikeImageSelector from 'components/BikeImageSelector'
import BikeSpecs from 'components/BikeSpecs'
import BikeType from 'components/BikeType'
import { BookingButton, FavoriteIcon, LikeButton, PriceRow } from './BikeDetailsMobileDrawer.styles'
import BookingAddressMap from 'components/BookingAddressMap'
import Bike from 'models/Bike'
import BikeDetailsOverview from './BikeDetailsMobileDrawer.overview'
import { ActivePage } from './types'
import BikeDetailsBooking from './BikeDetailsMobileDrawer.booking'

interface BikeDetailsMobileDrawerProps {
    bike: Bike;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BikeDetailsMobileDrawer: React.FC<BikeDetailsMobileDrawerProps> = ({ bike, open, setOpen }) => {
    const theme = useTheme()
    const rateByDay = bike?.rate || 0
    const rateByWeek = rateByDay * 7

    const [activePage, setActivePage] = useState<ActivePage>('overview');

    const PAGES = React.useMemo(() => ({
        'overview': <BikeDetailsOverview
            imageUrls={bike.imageUrls || []}
            bodySize={bike.bodySize || 0}
            maxLoad={bike.maxLoad || 0}
            ratings={bike.ratings || 0}
            name={bike.name || ''}
            type={bike.type || ''}
            description={bike.description || ''}
            rateByDay={rateByDay}
            rateByWeek={rateByWeek}
            setActivePage={setActivePage}
        />,
        'booking': <BikeDetailsBooking
            bike={bike}
            setActivePage={setActivePage}
        />
    }), [bike, rateByDay, rateByWeek]);

    useEffect(() => {
        setActivePage('overview')
    }, []);

    return (
        <div>
            {/* Dismissible = false is to prevent from being closed when in booking page which is full screen */}
            <Drawer.Root open={open} onOpenChange={setOpen} dismissible={activePage === 'booking' ? false : true}>
                {/* <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
          Open Drawer
        </Drawer.Trigger> */}
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    {PAGES[activePage]}
                </Drawer.Portal>
            </Drawer.Root>

        </div>
    )
}

export default BikeDetailsMobileDrawer