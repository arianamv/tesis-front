import React from 'react'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Snackbar, Typography } from '@mui/material';
import { eliminarAplicacion, eliminarEvaluacion, eliminarFundo, eliminarPlaga } from '../../services/adminService';

function PopUpEliminarAplicacion({show, setShow, row}) {
    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);
    const handleClose = async() => {
      setShow(false);
    };
    const handleEliminar = async() => {
      let data = {
        idADP: row.idADP,
      }
      console.log(data)
      const result = await eliminarAplicacion(data);
      if (result.status == 200) {
        console.log("Se eliminó con éxito de la base de datos");
        console.log(result)
        setSnackbar({ children: 'Dato eliminado correctamente', severity: 'success' });
      }
      else {
        alert('Algo salio mal al eliminar el dato');
      }
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
            <Button onClick={() => handleEliminar()} variant="contained" sx={{ backgroundColor: '#074F57' }}>
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

export default PopUpEliminarAplicacion