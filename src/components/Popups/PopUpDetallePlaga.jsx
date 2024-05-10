import React from 'react'
import { Alert, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Snackbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function PopUpDetallePlaga({show, setShow, titulo, lote}) {
  const handleClose = async() => {
    setShow(false);
  };
  console.log(lote)
  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="detalle-plaga"
        aria-describedby="detalle-plaga-description"
        fullWidth
        maxWidth="sm"
        fullHeight
        maxHeight="md"
      >
        <DialogTitle id="titulo">
        <Box display='flex'>
          <Box sx={{ width: '50%' }}>
            {titulo}
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
            <img src={require("../../assets/arañaRoja.jpg")} alt="plaga" width={'100%'} height={'100%'}/>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ width: '50%' }}>
          <DialogContentText id="descripcion">
            <Typography><b>Alerta:</b> Grave </Typography>
            <Typography><b>Cantidad encontrada:</b> 40 </Typography>
            <Typography><b>Fecha de registro:</b> 01/01/2024 </Typography>
            <Typography><b>Cultivo:</b> {lote.nombreCultivo}</Typography>
            <Typography><b>Variedad:</b> {lote.nombreVariedad}</Typography>
            <Typography><b>Evaluador:</b> Sergio Soto Vargas </Typography>
          </DialogContentText>
          </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
          <DialogContentText id="descripcion">
            <Typography><b>Acciones correctivas recomendadas:</b> </Typography>
            <Typography><b>1.</b> Abamectina por siete días </Typography>
            <Typography><b>2.</b> Abamectina por siete días </Typography>
            <Typography><b>3.</b> Abamectina por siete días </Typography>
          </DialogContentText>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PopUpDetallePlaga