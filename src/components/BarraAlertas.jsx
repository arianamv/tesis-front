import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, Paper } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { listarCultivos, listarPlagasActivas } from '../services/adminService';
import PopUpDetallePlaga from './Popups/PopUpDetallePlaga';

function BarraAlertas({ evaluaciones, lotes, plagas, setPlagas, cultivos, setCultivos, uvaCheck, setUvaCheck, paltaCheck, setPaltaCheck, aranCheck, setAranCheck, semana }) {
  const [color, setColor] = useState('#FFE3E3');
  const [show, setShow] = useState(false);
  let [lote, setLote] = React.useState(-1);
  let [evaluacion, setEvaluacion] = React.useState(-1);
  const [selectedChecked, setSelectedChecked] = React.useState(true);

  const handleOpen = (e, found) => {
    setLote(found);
    setEvaluacion(e);
    setShow(true);
  }

  const handleChangeUvas = (e) => {
    setUvaCheck(e.target.checked);
  }

  const handleChangePalta = (e) => {
    setPaltaCheck(e.target.checked);
  }

  const handleChangeAran = (e) => {
    setAranCheck(e.target.checked);
  }

  const getPlagasActivas = (data) => {
    listarPlagasActivas(data).then((response) => {
      if(response?.data){
        if(response?.data.Evaluacion){
          let auxPlagas = [];
          for(let i = 0; i < response?.data?.Evaluacion?.length; i++){
            auxPlagas.push({
              idPlaga: response?.data.Evaluacion[i].idPlaga,
              nombrePlaga: response?.data.Evaluacion[i].nombrePlaga,
              checked: true,
            })
          }
          setPlagas(auxPlagas);
          plagas = auxPlagas;
        }
      }
    })
  }

  const getCultivos = (data) => {
    listarCultivos().then((response) => {
      if(response?.data){
        if(response?.data.Cultivo){
          let auxCultivos = [];
          for(let i = 0; i < response?.data?.Cultivo?.length; i++){
            auxCultivos.push({
              idCultivo: response?.data.Cultivo[i].idCultivo,
              nombreCultivo: response?.data.Cultivo[i].nombreCultivo,
              checked: true,
            })
          }
          setCultivos(auxCultivos);
          cultivos = auxCultivos;
        }
      }
    })
  }

  const handleChangePlaga = (e, index, plaga) => {
    let newArray = [...plagas];
    plaga.checked = e.target.checked;
    newArray[index] = plaga;
    setPlagas(newArray);
    console.log(plagas);
  }

  const handleChangeCultivo = (e, index, cultivo) => {
    let newArray = [...cultivos];
    cultivo.checked = e.target.checked;
    newArray[index] = cultivo;
    setCultivos(newArray);
    console.log(cultivos);
  }

  function padWithLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
  }

  const capitalizeWords = (str) => {
    if(str != null || str != undefined)
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatDate = (value) => {
    let date = new Date(value)
    if(value != null)
    return padWithLeadingZeros(date.getUTCDate(), 2) + '/' + padWithLeadingZeros(parseInt(date.getUTCMonth() + 1), 2) + '/' + date.getUTCFullYear();    
  }

  const getColor = (value) => {
    if(value === 1) return '#E0FFD5';
    if(value === 2) return '#FFE1D1';
    if(value === 3) return '#FFE3E3';
  }

  const formatGravedad = (value) => {
    if(value === 1) return 'Leve';
    if(value === 2) return 'Media';
    if(value === 3) return 'Grave';
  }

  

  useEffect(() => {
    let data = {
      "nombre_id": semana
    }
    getPlagasActivas(data);
    getCultivos();
  }, [])

  useEffect(() => {
    let data = {
      "nombre_id": semana
    }
    getPlagasActivas(data);
  }, [semana])

  return (
    <div>
      <PopUpDetallePlaga
        show={show}
        setShow={setShow}
        lote={lote}
        evaluacion={evaluacion}
      />
      <Box sx={{ 
        pt: 1, 
        pl: 2, 
        width: 240,
        borderRight: 1,
        borderColor: '#D3D3D3',
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}>
        <Typography sx={{ color: '#103A5E' }}>Monitoreo de plagas</Typography>
        <Divider sx={{ width: 200 }}/>
        <Box sx={{ 
          maxHeight: '50vh',
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}>
          <Typography variant='body2' sx={{ color: '#103A5E', pt: 1, mb: 1.5 }}>Cultivos</Typography>
          <Box 
            sx={{
              display: "flex",
              flexDirection: "column",
            }}>
            {cultivos?.map((cultivo, index) => {
              return(
                <FormControlLabel size='small' sx={{mt: -2}}
                  control={<Checkbox color="success" checked={cultivo.checked} onChange={(e) => handleChangeCultivo(e, index, cultivo)} defaultChecked size='small' sx={{transform: "scale(0.8)",}}/>}
                  label={<Typography variant='caption' sx={{lineHeight: '12px'}}>{cultivo.nombreCultivo}</Typography>}
                />
              )
            })}
          </Box>
          <Typography variant='body2' sx={{ color: '#103A5E', mb: 1.5 }}>Plagas</Typography>
          <Box 
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {plagas?.map((plaga, index) => {
              return(
                <FormControlLabel size='small' sx={{mt: -2}}
                  control={<Checkbox color="success" checked={plaga.checked} onChange={(e) => handleChangePlaga(e, index, plaga)} defaultChecked size='small' sx={{transform: "scale(0.8)",}}/>}
                  label={<Typography variant='caption' sx={{lineHeight: '12px'}}>{plaga.nombrePlaga}</Typography>}
                />
              )
            })}
          </Box>
        </Box>
        <Typography sx={{ color: '#103A5E'}}>Plagas activas</Typography>
        <Divider sx={{ width: 200 }}/>
        <Box
          sx={{
            maxHeight: '60vh',
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          {evaluaciones.map((e) => {
            const color = getColor(e.gravedad)
            const found = lotes.find(({ idCampañaXLote }) => idCampañaXLote === e.idCampañaXLote);
            return (
              <Box
                display={'grid'}
                sx={{ mt: 1, width: 200, pt: 0.5, pb: 0.5, pl: 1, pr: 1, backgroundColor: color, borderRadius: 2 }}
              >
                <Box display={'flex'} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box display={'flex'} sx={{ alignItems: 'center' }}>
                    <NotificationsActiveIcon sx={{ color: '#7D7D7D', fontSize: '12px' }}/>
                    <Typography sx={{ fontSize: '10px', ml: 0.5, color: '#7D7D7D' }}>Alerta {formatGravedad(e.gravedad)}</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '10px', color: '#103A5E' }}>{formatDate(e.fecha)}</Typography>
                </Box>
                <Box display={'flex'} sx={{ justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: '12px', color: '#103A5E' }}>{e.nombrePlaga}</Typography>
                </Box>
                <Box display={'flex'} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '10px', color: '#103A5E' }}>Cantidad: {e.cantEncontrada}</Typography>
                  <Button 
                  variant='contained'
                  size='small'
                  onClick={() => handleOpen(e, found)}
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
          })}
        </Box>
      </Box>
    </div>
  )
}

export default BarraAlertas