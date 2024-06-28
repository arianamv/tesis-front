import React, { useState } from 'react'
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
import { insertarCampaña, listarFundos, listarVariedadesXCultivo } from '../../services/adminService';

function Cultivos({cultivo, i, cultivos, setCultivos, idFundo}){
  const [selectedCultivo, setSelectedCultivo] = React.useState(1);
  const [selectedFecha, setSelectedFecha] = React.useState(dayjs());

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
    console.log(e, cultivos)
  }

  const [campañaXCultivo, setCampañaXCultivo] = React.useState("");

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

function PopUpAñadirCampaña({show, setShow, idFundo}) {
    const [showSection, setShowSection] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState(null);

    const [nombre, setNombre] = React.useState("");
    const [descripcion, setDescripcion] = React.useState("");
    const [fechaIni, setFechaIni] = React.useState(dayjs());
    const [fechaFin, setFechaFin] = React.useState(dayjs());

    const [selectedCampaña, setSelectedCampaña] = React.useState({
      nombre: "",
      descripcion: "",
      fechaIni: "",
      fechaFin: "",
      estado: 1,
      cultivos: [],
    })

    let [fundos, setFundos] = useState([]);

    const handleCloseSnackbar = () => setSnackbar(null);
    const handleClose = async() => {
      limpiarDatos();
      setShow(false);
    };

    const getFundos = () => {
      listarFundos().then((response) => {
        setFundos(response.data?.Fundo)
        fundos = response.data?.Fundo
      })
    }

    const [selectedFundo, setSelectedFundo] = React.useState(1);
    const handleChangeFundo = (e) => {
      setSelectedFundo(e.target.value);
    }

    const [cultivos, setCultivos] = React.useState([{
      Campaña_idCampaña: 1,
      Cultivo_idCultivo: 1,
      fechCosecha: dayjs(),
      Cultivo_idCultivo1: 1,
      Fundo_idFundo: 1,
      estado: 1,
    }]);

    const handleAddCultivo = () => {
      const newCultivo = {
        Campaña_idCampaña: 1,
        Cultivo_idCultivo: 1,
        fechCosecha: dayjs(),
        Cultivo_idCultivo1: 1,
        Fundo_idFundo: 1,
        estado: 1,
      }
      console.log(cultivos.length)
      if(cultivos.length < 3) setCultivos(v => [...v, newCultivo])
    }

    const addCampaña = async(data) => {
      const result = await insertarCampaña(data);
      if (result.status == 200) {
        console.log("Se editó con éxito la base de datos");
        console.log(result)
        setSnackbar({ children: 'Dato insertado correctamente', severity: 'success' });
      }
      else {
        alert('Algo salio mal al guardar la campaña');
      }
      limpiarDatos();
      setShow(false);
    }

    const limpiarDatos = () => {
      setNombre("");
      setDescripcion("");
      setFechaIni(dayjs());
      setFechaFin(dayjs());
      setCultivos([{
        Campaña_idCampaña: 1,
        Cultivo_idCultivo: 1,
        fechCosecha: dayjs(),
        Cultivo_idCultivo1: 1,
        Fundo_idFundo: 1,
        estado: 1,
      }]);
    }

    React.useEffect(() => {
      let newCampaña = {
        nombre: nombre,
        descripcion: descripcion,
        fechaIni: fechaIni,
        fechaFin: fechaFin,
        cultivos: cultivos,
        estado: 1
      }
      setSelectedCampaña(newCampaña)
      console.log(newCampaña)
    }, [nombre, descripcion, fechaIni, fechaFin, cultivos])

    React.useEffect(() => {
      getFundos();
    }, [])

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
            {"Nueva campaña"}
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
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>
                Fundo:     
              </Typography>
              <FormControl size="small" sx={{ m: 1, width: '80%' }}>
              <Select
                labelId="fundo"
                id="fundo"
                value={selectedFundo}
                variant='outlined'
                onChange={handleChangeFundo}
                name="fundo"
              >
                {fundos.map((fundo, index) => (
                  <MenuItem value={fundo.idFundo}>
                    {fundo.nombreFundo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                idFundo={selectedFundo}
              />
            )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: '#074F57' }}>Cancelar</Button>
            <Button onClick={() => addCampaña(selectedCampaña)} variant="contained" sx={{ backgroundColor: '#074F57' }}>
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

export default PopUpAñadirCampaña