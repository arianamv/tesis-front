import React from 'react'
import { Alert, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Snackbar, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import dayjs from 'dayjs';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function PopUpAñadirEvaluador({show, setShow}) {
    const [showSection, setShowSection] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState(null);

    const [nombre, setNombre] = React.useState("");
    const [apellidoPat, setApellidoPat] = React.useState("");
    const [apellidoMat, setApellidoMat] = React.useState("");
    const [correo, setCorreo] = React.useState("");
    const [telefono, setTelefono] = React.useState("");
    const [dni, setDNI] = React.useState("");

    const handleCloseSnackbar = () => setSnackbar(null);
    const handleClose = async() => {
      limpiarDatos();
      setShow(false);
    };

    const [selectedCultivo, setSelectedCultivo] = React.useState(1);
    const handleChangeCultivo = (e) => {
      setSelectedCultivo(e.target.value);
    }

    const [cultivos, setCultivos] = React.useState([]);
    const handleAddCultivo = () => {
      const newCultivo = Date.now()
      console.log(cultivos.length)
      if(cultivos.length < 2) setCultivos(v => [...v, newCultivo])
    }

    const limpiarDatos = () => {
      setNombre("");
      setApellidoMat("");
      setApellidoPat("");
      setDNI("");
      setTelefono("");
      setCorreo("");
      setCultivos([]);
    }

    return (
      <div>
        <Dialog
          open={show}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="md"
          fullHeight
          maxHeight="md"
        >
          <DialogTitle id="titulo" sx={{ color: '#103A5E' }}>
            {"Nuevo evaluador"}
            <Divider/>
          </DialogTitle>
          <DialogContent>
            <Box display='flex' sx={{ flexDirection: 'column' }}>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>
                Nombres:     
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '80%' }} value={nombre} onChange={(e) => setNombre(e.target.value)}/>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>
                Apellido paterno:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '28%' }} value={apellidoPat} onChange={(e) => setApellidoPat(e.target.value)}/>
              <Typography>
                Apellido materno:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '28%' }} value={apellidoMat} onChange={(e) => setApellidoMat(e.target.value)}/>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>
                Correo electrónico:     
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '80%' }} value={correo} onChange={(e) => setCorreo(e.target.value)}/>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>
                DNI:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '28%' }} value={dni} onChange={(e) => setDNI(e.target.value)}/>
              <Typography>
                Telefono:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '28%' }} value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ color: '#103A5E' }}>
                Lote(s) autorizado(s):
              </Typography>
              <IconButton
                onClick={handleAddCultivo}
              >
                <AddCircleOutlineIcon style={{ color: "#074F57" }}/>
              </IconButton>
            </Box>
            <Divider/>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>
                Lote:
              </Typography>
              <FormControl size="small" sx={{ m: 1, width: '80%' }}>
                <Select
                  labelId="fundo"
                  id="fundo"
                  value={selectedCultivo}
                  variant='outlined'
                  onChange={handleChangeCultivo}
                  name="fundo"
                  
                >
                  <MenuItem value={1}>
                    {"Uva"}
                  </MenuItem>
                  <MenuItem value={2}>
                    {"Palta"}
                  </MenuItem>
                  <MenuItem value={3}>
                    {"Arándano"}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            </Box>
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

export default PopUpAñadirEvaluador