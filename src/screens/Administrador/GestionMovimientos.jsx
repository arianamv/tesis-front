import React from 'react'
import NavBarAdmin from '../../components/NavbarAdmin'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function GestionMovimientos() {
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <NavBarAdmin/>
        <Typography variant='h6' sx={{ pt: 3, pl: 3, fontWeight: 'medium' }}>Gestión de movimientos</Typography>
      </Box>
    </div>
  )
}

export default GestionMovimientos