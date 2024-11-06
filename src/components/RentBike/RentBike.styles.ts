import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Card,
  CardProps,
  styled,
} from '@mui/material'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import CircularProgress from '@mui/material/CircularProgress';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const DatePickerWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 22
}))

export const InfoIcon = styled(InfoOutlined)(({ theme }) => ({
  color: theme.palette.grey[500],
}))

export const CircularProgressIcon = styled(CircularProgress)(({ theme }) => ({
  color: 'currentColor',
  width: '1em',
  height: '1em'
}))

export const CalendarMonthStyledIcon = styled(CalendarMonthIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}))

export const OverviewContainer = styled(Card)<CardProps>(({ theme }) => ({
  borderColor: theme.palette.grey[500],
  padding: 34,
  height: 'fit-content',
  overflow: 'visible'
}))

export const CalendarDrawerTriggerWrapper = styled(Card)<CardProps>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${theme.palette.grey[500]}`,
    padding: '12px 20px',
    borderRadius: '50px',
    gap: '10px',
    boxShadow: 'none',
}))

export const BookingButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: 20,
  padding: '18px 0',
  marginTop: 30,
  textTransform: 'none',
  color: theme.palette.common.white,
  fontWeight: 800,
  display: 'flex',
  flexDirection: 'row',
  gap: '0.625rem'
}))

export const SelectDateButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderRadius: 20,
    padding: '18px 0',
    marginTop: 30,
    textTransform: 'none',
    color: theme.palette.common.white,
    fontWeight: 800,
    width: '100%',
    display: 'flex',
    alignItems: 'center'
}))

export const HomePageLink = styled('a')<ButtonProps>(({ theme }) => ({
  width: '100%',
  borderRadius: 20,
  padding: '18px 24px',
  marginTop: 30,
  textTransform: 'none',
  color: theme.palette.common.white,
  fontWeight: 800,
  display: 'flex',
  flexDirection: 'row',
  gap: '0.625rem',
  textDecoration: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
}))

export const PriceRow = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))
export const ThankYouPageWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}))
