import Bike from 'models/Bike'
import { SERVICE_FEE_PERCENTAGE } from './RentBike.contants'

export const getServicesFee = (amount: number): number =>
  Math.floor(amount * SERVICE_FEE_PERCENTAGE)


export function getInitialAmountDataState(bike: Bike) {
        const rateByDay = (bike?.rate || 0)
        const servicesFee = getServicesFee(rateByDay)
        const total = rateByDay + servicesFee

        const value = {
            rentAmount: (bike?.rate || 0),
            fee: getServicesFee(rateByDay),
            totalAmount: total
        }

        return value;
}


export const debounce = <F extends (...args: any[]) => any>(func: F, wait: number) => {
        let timeout: NodeJS.Timeout;
        return (...args: Parameters<F>) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
};
