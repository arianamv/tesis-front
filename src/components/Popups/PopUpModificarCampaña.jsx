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
import { modificarCampaña, modificarCampañaXCultivo } from '../../services/adminService';

function Cultivos({cultivo, i, cultivos, setCultivos, idFundo}){
  const [selectedCultivo, setSelectedCultivo] = React.useState(cultivo.Cultivo_idCultivo);
  const [selectedFecha, setSelectedFecha] = React.useState(dayjs(cultivo.fechCosecha));
  const handleChangeCultivo = (e) => {
    cultivo.Cultivo_idCultivo = e.target.value;
    cultivo.Cultivo_idCultivo1 = e.target.value;
    setSelectedCultivo(e.target.value);
  }
  const handleChangeFecha = (e) => {
    cultivo.fechCosecha = e;
    setSelectedFecha(e);
  }
  const handleDelete = (e) => {
    cultivos.splice(e, 1);
    setCultivos(oldArray => {
      return oldArray.filter((value, i) => i !== e)
    })
  }

  React.useEffect(() => {
    cultivo.Cultivo_idCultivo = selectedCultivo
    cultivo.fechCosecha = selectedFecha
    cultivo.Cultivo_idCultivo1 = selectedCultivo
    cultivo.Fundo_idFundo = idFundo
    cultivo.estado = 1
  console.log(cultivo);
}, [selectedCultivo, selectedFecha, idFundo])

  return(
    <Box>
      <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography>
        Cultivo:
      </Typography>
      <FormControl size="small">
        <Select
          labelId="fundo"
          id="fundo"
          value={selectedCultivo}
          variant='outlined'
          onChange={handleChangeCultivo}
          name="fundo"
          sx={{ m: 1, minWidth: 250 }}
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
      <Typography>
        Fecha cosecha:
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          slotProps={{ textField: { size: 'small' } }}
          sx={{ m: 1, width: 230 }}
          format="DD/MM/YYYY"
          value={selectedFecha}
          onChange={handleChangeFecha}
        />
      </LocalizationProvider>
      <IconButton onClick={() => handleDelete(i)}>
        <RemoveCircleOutlineIcon style={{ color: "#074F57" }}/>
      </IconButton>
    </Box>
    <Divider/>
    </Box>
  )
}

function PopUpModificarCampaña({show, setShow, row, fundo}) {
    const [showSection, setShowSection] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState(null);

    const [nombre, setNombre] = React.useState(row.nombre);
    const [descripcion, setDescripcion] = React.useState(row.descripcion);
    const [fechaIni, setFechaIni] = React.useState(dayjs(row.fechaIni));
    const [fechaFin, setFechaFin] = React.useState(dayjs(row.fechaFin));
    const [selectedCampaña, setSelectedCampaña] = React.useState({
      nombre: "",
      descripcion: "",
      fechaIni: "",
      fechaFin: "",
      estado: 1,
      cultivos: [],
    })

    const handleCloseSnackbar = () => setSnackbar(null);
    const handleClose = async() => {
      setShow(false);
    };

    const [cultivos, setCultivos] = React.useState(row.cultivos);
    const handleAddCultivo = () => {
      const newCultivo = {
        idCampañaXCultivo: 1,
        Campaña_idCampaña: 1,
        Cultivo_idCultivo: 1,
        fechCosecha: dayjs(),
        Cultivo_idCultivo1: 1,
        Fundo_idFundo: 1,
        estado: 1,
      }
      if(cultivos.length < 3) setCultivos(v => [...v, newCultivo])
    }

    const modifyCampaña = async(data) => {
      const result = await modificarCampaña(data);
      if (result.status == 200) {
        console.log(result)
        setSnackbar({ children: 'Dato editado correctamente', severity: 'success' });
      }
      else {
        alert('Algo salio mal al guardar la campaña');
      }
      setShow(false);
    }

    const limpiarDatos = () => {
      setNombre("");
      setDescripcion("");
      setFechaIni(dayjs());
      setFechaFin(dayjs());
      setCultivos([{
        idCampañaXCultivo: 1,
        Campaña_idCampaña: 1,
        Cultivo_idCultivo: 1,
        fechCosecha: dayjs(),
        Cultivo_idCultivo1: 1,
        Fundo_idFundo: 1,
        estado: 1,
      }]);
    }

    React.useEffect(() => {
      setNombre(row.nombre);
      setDescripcion(row.descripcion);
      setFechaIni(dayjs(row.fechaIni));
      setFechaFin(dayjs(row.fechaFin));
      setCultivos(row.cultivos);
    }, [row])

    React.useEffect(() => {
      let newCampaña = {
        idCampaña: row.idCampaña,
        nombre: nombre,
        descripcion: descripcion,
        fechaIni: fechaIni,
        fechaFin: fechaFin,
        cultivos: cultivos,
        estado: 1,
      }
      setSelectedCampaña(newCampaña);
      console.log(selectedCampaña);
    }, [nombre, descripcion, fechaIni, fechaFin, cultivos])

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
            {"Modificar campaña"}
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
              <Typography>
                Fecha de inicio:
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={fechaIni}
                  onChange={(e) => setFechaIni(e)}
                  slotProps={{ textField: { size: 'small' } }}
                  sx={{ m: 1, minWidth: 120 }}
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
              <Typography>
                Fecha de fin:
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e)}
                  slotProps={{ textField: { size: 'small' } }}
                  sx={{ m: 1, minWidth: 120 }}
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ color: '#103A5E' }}>
                Cultivo(s):
              </Typography>
              <IconButton
                onClick={handleAddCultivo}
              >
                <AddCircleOutlineIcon style={{ color: "#074F57" }}/>
              </IconButton>
            </Box>
            <Divider/>
            {cultivos.map((cultivo, i) => 
              <Cultivos
                cultivo={cultivo}
                i={i}
                cultivos={cultivos}
                setCultivos={setCultivos}
                idFundo={fundo}
              />
            )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: '#074F57' }}>Cancelar</Button>
            <Button onClick={() => modifyCampaña(selectedCampaña)} variant="contained" sx={{ backgroundColor: '#074F57' }}>
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

export default PopUpModificarCampaña