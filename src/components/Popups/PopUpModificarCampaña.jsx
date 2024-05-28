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

function Cultivos({cultivo, i, cultivos, setCultivos}){
  const [selectedCultivo, setSelectedCultivo] = React.useState(cultivo.idCultivo);
  const [selectedFecha, setSelectedFecha] = React.useState(dayjs(cultivo.fechaCosecha));
  console.log(cultivos)
  const handleChangeCultivo = (e) => {
    cultivo.idCultivo = e.target.value;
    setSelectedCultivo(e.target.value);
  }
  const handleChangeFecha = (e) => {
    cultivo.fechaCosecha = e;
    setSelectedFecha(e);
  }
  const handleDelete = (e) => {
    cultivos.splice(e, 1);
    setCultivos(oldArray => {
      return oldArray.filter((value, i) => i !== e)
    })
  }
  return(
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
          sx={{ m: 1, minWidth: 120 }}
          format="DD/MM/YYYY"
          value={selectedFecha}
          onChange={handleChangeFecha}
        />
      </LocalizationProvider>
      <IconButton onClick={() => handleDelete(i)}>
        <RemoveCircleOutlineIcon style={{ color: "#074F57" }}/>
      </IconButton>
    </Box>
  )
}

function PopUpModificarCampaña({show, setShow, row}) {
    const [showSection, setShowSection] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState(null);

    let [nombre, setNombre] = React.useState(row.nombre);
    nombre = row.nombre;
    let [descripcion, setDescripcion] = React.useState(row.descripcion);
    descripcion = row.descripcion;
    let [fechaIni, setFechaIni] = React.useState(dayjs(row.fechaIni));
    fechaIni = dayjs(row.fechaIni);
    let [fechaFin, setFechaFin] = React.useState(dayjs(row.fechaFin));
    fechaFin = dayjs(row.fechaFin);

    const [newCampaña, setNewCampaña] = React.useState({
      nombre: row.nombre,
      descripcion: row.descripcion,
      fechaIni: dayjs(row.fechaIni),
      fechaFin: dayjs(row.fechaFin),
      estado: 1,
      cultivos: row.cultivos,
    })

    const handleCloseSnackbar = () => setSnackbar(null);
    const handleClose = async() => {
      setShow(false);
    };

    let [cultivos, setCultivos] = React.useState(row.cultivos);
    cultivos = row.cultivos;
    const handleAddCultivo = () => {
      const newCultivo = {
        idCultivo: 1,
        fechaCosecha: dayjs(),
      }
      if(cultivos.length < 3) setCultivos(v => [...v, newCultivo])
    }

    React.useEffect(() => {
      newCampaña.nombre = nombre;
      newCampaña.descripcion = descripcion;
      newCampaña.fechaIni = fechaIni;
      newCampaña.fechaFin = fechaFin;
      newCampaña.cultivos = cultivos;
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

export default PopUpModificarCampaña