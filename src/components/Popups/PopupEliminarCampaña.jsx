import React from 'react'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Snackbar, Typography } from '@mui/material';

function PopupEliminar({show, setShow}) {
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);
  const handleClose = async() => {
    setShow(false);
  };
  return (
    <div>
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="titulo">
          {"Confirmar Eliminación"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="descripcion">
            {"El dato será eliminado automáticamente al seleccionar el botón de “Eliminar”."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#074F57' }}>Cancelar</Button>
          <Button onClick={handleClose} variant="contained" sx={{ backgroundColor: '#074F57' }}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  )
}

export default PopupEliminar