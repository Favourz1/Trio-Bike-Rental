import { Box, styled, BoxProps } from '@mui/material'
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import FilterListOffOutlinedIcon from '@mui/icons-material/FilterListOffOutlined';

export const Container = styled(Box)<BoxProps>(() => ({
  width: '100%',
  marginTop: 45,
}))

export const QuantityContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems:'center',
  justifyContent: 'flex-end',
  gap: '10px',
  marginBottom: 35,

  [theme.breakpoints.down('md')]: {
    marginBottom: 8,
  },
}))

export const ListContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: 25,

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}))

export const FilterIcon = styled(FilterListOutlinedIcon)(({ theme }) => ({
  color: theme.palette.common.white,
  cursor: 'pointer',
  
}))
export const FilterCancelIcon = styled(FilterListOffOutlinedIcon)(({ theme }) => ({
  color: theme.palette.common.white,
  cursor: 'pointer',
  
}))


export const FilterIconWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  // backgroundColor: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  borderRadius: '10px',
  padding: '8px',
  '&:hover': {
    backgroundColor: '#f4f4f41a',
  },
}))
