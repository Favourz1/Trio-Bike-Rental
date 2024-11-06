import { Box, styled, BoxProps } from '@mui/material'

interface BikeImageProps extends BoxProps {
  isLoaded: boolean
}

export const Container = styled(Box)<BoxProps>(({ theme }) => ({
  marginBottom: 30,
  display: 'grid',
  gridTemplateColumns: '100px 1fr',
  gap: 32,

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: 4,
  },
}))

export const BikeImage = styled('img', {
  shouldForwardProp: (prop) => prop !== 'isLoaded',
})<BikeImageProps>(({ theme, isLoaded }) => ({
  display: isLoaded ? 'block' : 'none',
  objectFit: 'contain',
  maxHeight: '100%',
  [theme.breakpoints.down('md')]: {
    maxHeight: '80%',
  },
}))

export const Circle = styled('div')<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: isSelected ? theme.palette.common.black : theme.palette.grey[400],
  margin: '0 5px',
  cursor: 'pointer',
}))

export const CircleContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 10,
})
