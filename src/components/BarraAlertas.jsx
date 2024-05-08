import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function BarraAlertas({ uvaCheck, setUvaCheck, paltaCheck, setPaltaCheck, aranCheck, setAranCheck }) {
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
          <Typography sx={{ color: '#103A5E', mt: -6}}>Plagas activas</Typography>
          <Divider sx={{ width: 200 }}/>
        </Box>
      </Box>
    </div>
  )
}

export default BarraAlertas