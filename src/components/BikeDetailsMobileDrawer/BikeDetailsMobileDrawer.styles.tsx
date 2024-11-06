import {
    Box,
    BoxProps,
    Button,
    ButtonProps,
    Card,
    CardProps,
    DialogContent,
    IconButton,
    IconButtonProps,
    styled,
    Typography,
    TypographyProps,
} from '@mui/material'
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined'
import ChevronRightOutlined from '@mui/icons-material/ChevronRightOutlined'
import HomeOutlined from '@mui/icons-material/HomeOutlined'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined'
import Menu from '@mui/icons-material/Menu'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';


export const BreadcrumbContainer = styled(Box)<BoxProps>(({ theme }) => ({
    position: 'relative',
    margin: '32px 0 32px 100px',

    [theme.breakpoints.down('lg')]: {
        margin: '90px 0 32px 8vw',
    },
}))

export const BreadcrumbHome = styled(HomeOutlined)(({ theme }) => ({
    color: theme.palette.primary.light,
    fontSize: 24,
    fontWeight: 300,
}))

export const BreadcrumbSeparator = styled(ChevronRightOutlined)(({ theme }) => ({
    color: theme.palette.primary.light,
    fontSize: 14,
    fontWeight: 300,
}))

export const Content = styled(Box)<BoxProps>(({ theme }) => ({
    padding: '0 100px 44px',
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 24,

    [theme.breakpoints.down('lg')]: {
        gridTemplateColumns: '1fr',
        padding: '0 20px 44px',
    },
}))

export const BookingBikeDetailsWrapper = styled(Card)<CardProps>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${theme.palette.grey[500]}`,
    padding: '12px 24px',
    borderRadius: '30px',
    gap: '10px',
    boxShadow: 'none',
    marginBottom: '1rem'
}))

export const LikeButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 20,
    width: 60,
    height: 60,
}))

export const FavoriteIcon = styled(FavoriteBorderOutlined)(({ theme }) => ({
    color: theme.palette.common.black,
}))
export const CaretLeftIcon = styled(KeyboardArrowLeftIcon)(({ theme }) => ({
    color: theme.palette.common.black,
}))

export const InfoIcon = styled(InfoOutlined)(({ theme }) => ({
    color: theme.palette.grey[500],
}))

export const OverviewContainer = styled(Card)<CardProps>(({ theme }) => ({
    borderColor: theme.palette.grey[500],
    padding: 34,
    maxHeight: 295,
}))

export const BookingButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderRadius: 20,
    padding: '18px 0',
    marginTop: 30,
    textTransform: 'none',
    color: theme.palette.common.white,
    fontWeight: 800,
}))

export const PriceRow = styled(Box)<BoxProps>(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}))


export const LocationIcon = styled(LocationOnOutlined)(({ theme }) => ({
    color: theme.palette.common.black,
}))

export const MenuIcon = styled(Menu)(({ theme }) => ({
    color: theme.palette.common.black,
}))

export const Actions = styled(Box)(() => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 34,
}))

export const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
    color: theme.palette.common.black,
    textTransform: 'none',
    fontSize: 34,
    fontWeight: 800,
}))

export const MenuModal = styled(DialogContent)(() => ({
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}))

export const LoginButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.common.black,
    borderRadius: 16,
    textTransform: 'none',
    fontSize: 16,
    margin: '0 30px 8px',

    '&:hover': {
        color: theme.palette.primary.light,
    },
}))

export const SignUpButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.common.black,
    borderRadius: 16,
    textTransform: 'none',
    fontSize: 16,
    padding: '14px 20px',

    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
}))
