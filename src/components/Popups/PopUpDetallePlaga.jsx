import React, { useEffect, useState } from 'react'
import { Alert, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Snackbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { listarMejoresPesticidas } from '../../services/adminService';

function PopUpDetallePlaga({show, setShow, titulo, lote, evaluacion}) {
  const handleClose = async() => {
    setShow(false);
  };

  function padWithLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
  }

  const formatDate = (value) => {
    let date = new Date(value)
    if(value != null)
    return padWithLeadingZeros(date.getUTCDate(), 2) + '/' + padWithLeadingZeros(parseInt(date.getUTCMonth() + 1), 2) + '/' + date.getUTCFullYear();    
  }

  const formatGravedad = (value) => {
    if(value === 1) return 'Leve';
    if(value === 2) return 'Media';
    if(value === 3) return 'Grave';
  }

  const capitalizeWords = (str) => {
    if(str != null || str != undefined)
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  let [pesticidas, setPesticidas] = useState([]);

  const getPesticidas = (data) => {
    listarMejoresPesticidas(data).then((response) => {
      setPesticidas(response.data?.Pesticida)
      pesticidas = response.data?.Pesticida
    })
}

  useEffect(() => {
    const data = {
      "idPlaga": evaluacion.idPlaga,
      "idCultivo": lote.idCultivo,
      "fechaEvaluacion": evaluacion.fecha,
      "fechaCosecha": lote.fechaCosecha,
    }
    console.log(data)
    getPesticidas(data);
  }, [])

  useEffect(() => {
    const data = {
      "idPlaga": evaluacion.idPlaga,
      "idCultivo": lote.idCultivo,
      "fechaEvaluacion": evaluacion.fecha,
      "fechaCosecha": lote.fechaCosecha,
    }
    console.log(data)
    getPesticidas(data);
  }, [lote, evaluacion])

  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="detalle-plaga"
        aria-describedby="detalle-plaga-description"
        fullWidth
        maxWidth="md"
        fullHeight
        maxHeight="md"
      >
        <DialogTitle id="titulo">
        <Box display='flex'>
          <Box sx={{ width: '50%' }}>
            {evaluacion.nombrePlaga}
          </Box>
          <Box display='flex' justifyContent={'flex-end'} sx={{ width: '50%' }}>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          </Box>
        </Box>
        <Divider/>
        </DialogTitle>
        <DialogContent>
          <Box display='flex'>
          <Box sx={{ width: '50%' }}>
            {evaluacion !== -1 && <img src={require("../../assets/imagenes plagas/" + evaluacion.idPlaga + ".jpg")} alt="plaga" width={'100%'} height={'100%'}/>}
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ width: '50%' }}>
          <DialogContentText id="descripcion">
            <Typography><b>Alerta:</b> {formatGravedad(evaluacion.gravedad)} </Typography>
            <Typography><b>Cantidad encontrada:</b> {evaluacion.cantEncontrada} </Typography>
            <Typography><b>Fecha de registro:</b> {formatDate(evaluacion.fecha)} </Typography>
            <Typography><b>Cultivo:</b> {capitalizeWords(lote.nombreCultivo)}</Typography>
            <Typography><b>Variedad:</b> {capitalizeWords(lote.nombreVariedad)}</Typography>
            <Typography><b>Evaluador:</b> {capitalizeWords(evaluacion.usuario)} </Typography>
          </DialogContentText>
          </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
          <DialogContentText id="descripcion">
            <Typography sx={{ mb: 1 }}><b>Acciones correctivas recomendadas:</b> </Typography>
            {pesticidas?.map((pesticida, index) => {
              return (
                <Typography sx={{ mb: 1 }}><b>{index + 1}. {pesticida.nombrePeticida} {"(" + pesticida.dosisRec + pesticida.unidadRec + ")"}: </b> Aplicarse {pesticida.periodoCarencia} días antes de la cosecha y esperar {pesticida.periodoReingreso} horas antes de volver a ingresar al campo. {pesticida.recomendaciones} </Typography>
              )
            })}
          </DialogContentText>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PopUpDetallePlaga