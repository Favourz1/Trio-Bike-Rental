import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RentBike from './RentBike.component';
import { mockedBike } from 'mocks/Bike';
import { useMediaQuery } from '@mui/material';

jest.mock('@mui/material', () => ({
    ...jest.requireActual('@mui/material'),
    useMediaQuery: jest.fn(),
}));

describe('RentBike component', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <RentBike bike={mockedBike} />
            </BrowserRouter>
        );
    });

    it('should have a bike overview container', () => {
        const overviewElement = screen.getByTestId('rentbike-overview-container');
        expect(overviewElement).toBeInTheDocument();
    });

    it('should have a booking button', () => {
        const bookingButton = screen.getByTestId('booking-button');
        expect(bookingButton).toBeInTheDocument();
    });

    it('should display the bike name in the thank you dialog', () => {
        const bookingButton = screen.getByTestId('booking-button');
        fireEvent.click(bookingButton);

        const bikeNameElement = screen.getByTestId('bike-name-details');
        expect(bikeNameElement).toBeInTheDocument();
    });

    it('should display the price details', () => {
        const subtotalElement = screen.getByTestId('price-row-subtotal');
        expect(subtotalElement).toBeInTheDocument();

        const serviceFeeElement = screen.getByTestId('price-row-service-fee');
        expect(serviceFeeElement).toBeInTheDocument();

        const totalElement = screen.getByTestId('price-row-total');
        expect(totalElement).toBeInTheDocument();
    });

    it('should show the thank you dialog when booking is successful on mobile', () => {
        (useMediaQuery as jest.Mock).mockReturnValue(true); // Simulate mobile screen
        const bookingButton = screen.getByTestId('booking-button');
        fireEvent.click(bookingButton);

        const thankYouDialog = screen.getByText(/Thank You/i);
        expect(thankYouDialog).toBeInTheDocument();
    });
});