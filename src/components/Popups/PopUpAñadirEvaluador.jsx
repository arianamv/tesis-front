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
import { listarLoteXFundo } from '../../services/adminService';

function Lotes({lote, i, lotes, setLotes, fundos, lotesFundo, setLotesFundo}){
  const [selectedFundo, setSelectedFundo] = React.useState(1);
  const [selectedLote, setSelectedLote] = React.useState(1);
  const handleChangeFundo = (e) => {
    lote.idFundo = e.target.value;
    setSelectedFundo(e.target.value);
    let id = {
      nombre_id: e.target.value
    }
    getLotes(id);
  }

  const getLotes = (id) => {
    listarLoteXFundo(id).then((response) => {
      setLotesFundo(response.data?.Lote)
      lotesFundo = response.data?.Lote
    })
  }

  const handleChangeLote = (e) => {
    lote.idLote = e.target.value;
    setSelectedLote(e.target.value);
  }
  const handleDelete = (e) => {
    lotes.splice(e, 1);
    setLotes(oldArray => {
      return oldArray.filter((value, i) => i !== e)
    })
    console.log(e, lotes)
  }
  return(
    <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography>
        Fundo:
      </Typography>
      <FormControl size="small" sx={{ width: '80%' }}>
        <Select
          labelId="fundo"
          id="fundo"
          value={selectedFundo}
          variant='outlined'
          onChange={handleChangeFundo}
          name="fundo"
          sx={{ m: 1, minWidth: 250 }}
        >
          {fundos.map((e) => (
            <MenuItem key={e.idFundo} value={e.idFundo}>
              {e.nombreFundo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton onClick={() => handleDelete(i)}>
        <RemoveCircleOutlineIcon style={{ color: "#074F57" }}/>
      </IconButton>
    </Box>
  )
}

function PopUpAñadirEvaluador({show, setShow, fundos, lotesFundo, setLotesFundo}) {
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

    const [lotes, setLotes] = React.useState([{
      idFundo: 1,
      idLote: 1,
    }]);
    const handleAddCultivo = () => {
      const newLote = {
        idFundo: 1,
        idLote: 1,
      }
      console.log(lotes.length)
      if(lotes.length < 2) setLotes(v => [...v, newLote])
    }

    const limpiarDatos = () => {
      setNombre("");
      setApellidoMat("");
      setApellidoPat("");
      setDNI("");
      setTelefono("");
      setCorreo("");
      setLotes([]);
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
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography>
                Apellido paterno:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '60%' }} value={apellidoPat} onChange={(e) => setApellidoPat(e.target.value)}/>
              </Box>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography sx={{ ml: 2 }}>
                Apellido materno:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '60%' }} value={apellidoMat} onChange={(e) => setApellidoMat(e.target.value)}/>
              </Box>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>
                Correo electrónico:     
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '80%' }} value={correo} onChange={(e) => setCorreo(e.target.value)}/>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography>
                DNI:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '60%' }} value={dni} onChange={(e) => setDNI(e.target.value)}/>
              </Box>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography sx={{ ml: 2 }}>
                Telefono:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '60%' }} value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
              </Box>
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
            {lotes.map((lote, i) => 
              <Lotes
                lote={lote}
                i={i}
                lotes={lotes}
                setLotes={setLotes}
                fundos={fundos}
                lotesFundo={lotesFundo}
                setLotesFundo={setLotesFundo}
              />
            )}
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