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
import { insertarPlaga } from '../../services/adminService';

function PopUpAñadirPlaga({show, setShow}) {
    const [showSection, setShowSection] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState(null);

    const [nombre, setNombre] = React.useState("");
    const [descripcion, setDescripcion] = React.useState("");
    const [familia, setFamilia] = React.useState("");
    const [nomCientifico, setNomCientifico] = React.useState("");
    const [cantGrave, setCantGrave] = React.useState("");
    const [cantMedio, setCantMedio] = React.useState("");
    const [cantLeve, setCantLeve] = React.useState("");

    const [selectedPlaga, setSelectedPlaga] = React.useState({
      nombrePlaga: "",
      descripcion: "",
      familia: "",
      nombreCientifico: "",
      cantGrave: "",
      cantMedio: "",
      cantLeve: "",
      estado: 1,
    })

    const handleCloseSnackbar = () => setSnackbar(null);
    const handleClose = async() => {
      limpiarDatos();
      setShow(false);
    };

    const addNewPlaga = async(data) => {
      const result = await insertarPlaga(data);
      if (result.status == 200) {
        console.log("Se editó con éxito la base de datos");
        console.log(result)
        setSnackbar({ children: 'Dato editado correctamente', severity: 'success' });
      }
      else {
        alert('Algo salio mal al guardar la plaga');
      }
      limpiarDatos();
      setShow(false);
    };

    const limpiarDatos = () => {
      setNombre("");
      setDescripcion("");
      setFamilia("");
      setNomCientifico("");
      setCantGrave("");
      setCantLeve("");
      setCantMedio("");
    }

    React.useEffect(() => {
      let newPlaga = {
        nombrePlaga: nombre,
        descripcion: descripcion,
        familia: familia,
        nombreCientifico: nomCientifico,
        cantGrave: parseInt(cantGrave),
        cantLeve: parseInt(cantLeve),
        cantMedio: parseInt(cantMedio),
        estado: 1,
      }
      setSelectedPlaga(newPlaga);
      console.log(selectedPlaga);
    }, [nombre, descripcion, familia, nomCientifico, cantGrave, cantMedio, cantLeve])

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
            {"Nueva plaga"}
            <Divider/>
          </DialogTitle>
          <DialogContent>
            <Box display='flex' sx={{ flexDirection: 'column' }}>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>
                Nombre:     
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '80%' }} value={nombre} onChange={(e) => setNombre(e.target.value)}/>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography sx={{ mt: 1 }}>
                Descripción:
              </Typography>
              <TextField id="standard-basic" multiline rows={2} variant="outlined" size="small" sx={{ m: 1, width: '80%' }} value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography>
                Nombre científico:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '60%' }} value={nomCientifico} onChange={(e) => setNomCientifico(e.target.value)}/>
              </Box>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography sx={{ ml: 2 }}>
                Familia:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '60%' }} value={familia} onChange={(e) => setFamilia(e.target.value)}/>
              </Box>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ color: '#103A5E' }}>
                Cantidades:
              </Typography>
            </Box>
            <Divider/>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography>
                Gravedad alta:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '60%' }} value={cantGrave} onChange={(e) => setCantGrave(e.target.value)}/>
              </Box>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography sx={{ ml: 2 }}>
                Gravedad media:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '60%' }} value={cantMedio} onChange={(e) => setCantMedio(e.target.value)}/>
              </Box>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography>
                Gravedad leve:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '60%' }} value={cantLeve} onChange={(e) => setCantLeve(e.target.value)}/>
              </Box>
            </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: '#074F57' }}>Cancelar</Button>
            <Button onClick={() => addNewPlaga(selectedPlaga)} variant="contained" sx={{ backgroundColor: '#074F57' }}>
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

export default PopUpAñadirPlaga