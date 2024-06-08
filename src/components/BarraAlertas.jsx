import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, Paper } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

function Plagas (){
  return (
    <Box
      display={'grid'}
      sx={{ mt: 1, width: 200, pt: 0.5, pb: 0.5, pl: 1, pr: 1, backgroundColor: '#FFE3E3', borderRadius: 2 }}
    >
      <Box display={'flex'} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display={'flex'} sx={{ alignItems: 'center' }}>
          <NotificationsActiveIcon sx={{ color: '#7D7D7D', fontSize: '12px' }}/>
          <Typography sx={{ fontSize: '10px', ml: 0.5, color: '#7D7D7D' }}>Alerta grave</Typography>
        </Box>
        <Typography sx={{ fontSize: '10px', color: '#103A5E' }}>01/01/2024</Typography>
      </Box>
      <Box display={'flex'} sx={{ justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: '12px', color: '#103A5E' }}>Arañita roja</Typography>
        <Typography sx={{ fontSize: '10px', color: '#103A5E' }}>13:05</Typography>
      </Box>
      <Box display={'flex'} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '10px', color: '#103A5E' }}>Cantidad: 44</Typography>
        <Button 
        variant='contained'
        size='small'
        sx={{
          ml: 1,
          backgroundColor: '#074F57',
          position: 'relative',
          fontSize: '6px',
          height: '20px'
          }}>
            Ver plaga
        </Button>
      </Box>
    </Box>
  )
}

function BarraAlertas({ uvaCheck, setUvaCheck, paltaCheck, setPaltaCheck, aranCheck, setAranCheck }) {
  const [color, setColor] = useState('#FFE3E3');
  console.log(uvaCheck)
  const handleChangeUvas = (e) => {
    setUvaCheck(e.target.checked);
  }
  const handleChangePalta = (e) => {
    setPaltaCheck(e.target.checked);
  }
  const handleChangeAran = (e) => {
    setAranCheck(e.target.checked);
  }
  return (
    <div>
      <Box sx={{ 
        pt: 1, 
        pl: 2, 
        width: 240,
        borderRight: 1,
        borderColor: '#D3D3D3',
        height: "100vh",
        display: 'grid'
      }}>
        <Box sx={{ 
          height: "0.1vh",
        }}>
          <Typography sx={{ color: '#103A5E' }}>Monitoreo de plagas</Typography>
          <Divider sx={{ width: 200 }}/>
          <Typography variant='body2' sx={{ color: '#103A5E', pt: 1 }}>Cultivos</Typography>
          <Box display='grid'>
            <FormControlLabel size='small' 
                control={<Checkbox color="success" checked={uvaCheck} onChange={handleChangeUvas} size='small' sx={{transform: "scale(0.8)",}}/>}
                label={<Typography variant='caption'>Uva</Typography>}
            />
            <FormControlLabel size='small' sx={{ mt: -2 }}
                control={<Checkbox color="success" checked={paltaCheck} onChange={handleChangePalta} defaultChecked size='small' sx={{transform: "scale(0.8)",}}/>}
                label={<Typography variant='caption'>Palta</Typography>}
            />
            <FormControlLabel size='small' sx={{ mt: -2 }}
                control={<Checkbox color="success" checked={aranCheck} onChange={handleChangeAran} defaultChecked size='small' sx={{transform: "scale(0.8)",}}/>}
                label={<Typography variant='caption'>Arándano</Typography>}
            />
          </Box>
          <Typography variant='body2' sx={{ color: '#103A5E' }}>Plagas</Typography>
          <Box display='grid'>
            <FormControlLabel size='small' 
                control={<Checkbox color="success" defaultChecked size='small' sx={{transform: "scale(0.8)",}}/>}
                label={<Typography variant='caption'>Arañita roja</Typography>}
            />
            <FormControlLabel size='small' sx={{ mt: -2 }}
                control={<Checkbox color="success" defaultChecked size='small' sx={{transform: "scale(0.8)",}}/>}
                label={<Typography variant='caption'>Arañita marrón</Typography>}
            />
            <FormControlLabel size='small' sx={{ mt: -2 }}
                control={<Checkbox color="success" defaultChecked size='small' sx={{transform: "scale(0.8)",}}/>}
                label={<Typography variant='caption'>Pulgón</Typography>}
            />
          </Box>
        </Box>
        <Box>
          <Typography sx={{ color: '#103A5E', mt: -4}}>Plagas activas</Typography>
          <Divider sx={{ width: 200 }}/>
          <Plagas/>
        </Box>
      </Box>
    </div>
  )
}

export default BarraAlertas