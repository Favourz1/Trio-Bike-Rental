import { SERVICE_FEE_PERCENTAGE } from './RentBike.contants'

export const getServicesFee = (amount: number): number =>
  Math.floor(amount * SERVICE_FEE_PERCENTAGE)
