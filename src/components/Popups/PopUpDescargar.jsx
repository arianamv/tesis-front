import React from 'react'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Snackbar, Typography } from '@mui/material';
import { CSVLink, CSVDownload } from "react-csv";

function PopUpDescargar({show, setShow, rowsTable}) {
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
          {"¿Descargar con filtros seleccionados?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="descripcion">
            {"Se descargará un reporte con los filtros seleccionados en la pantalla anterior."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#074F57' }}>Cancelar</Button>
          <CSVLink data={rowsTable} filename="reporte.csv">
          <Button onClick={handleClose} variant="contained" sx={{ backgroundColor: '#074F57' }}>
            Confirmar
          </Button>
          </CSVLink>
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

export default PopUpDescargar