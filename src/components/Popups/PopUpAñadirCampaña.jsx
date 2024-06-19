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
import { insertarCampaña, listarVariedadesXCultivo } from '../../services/adminService';

function Cultivos({cultivo, i, cultivos, setCultivos}){
  const [selectedCultivo, setSelectedCultivo] = React.useState(1);
  const [selectedVariedad, setSelectedVariedad] = React.useState(1);
  const [selectedFecha, setSelectedFecha] = React.useState(dayjs());
  let [variedades, setVariedades] = React.useState([]);

  const handleChangeCultivo = (e) => {
    cultivo.idCultivo = e.target.value;
    setSelectedCultivo(e.target.value);
    let id = {
      nombre_id: e.target.value
    }
    getVariedades(id);
  }

  const handleChangeVariedad = (e) => {
    cultivo.idVariedad = e.target.value;
    setSelectedVariedad(e.target.value);
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
    console.log(e, cultivos)
  }

  const getVariedades = (id) => {
    listarVariedadesXCultivo(id).then((response) => {
        setVariedades(response.data?.Cultivo)
        variedades = response.data?.Cultivo
      })
  }

  React.useEffect(() => {
    let data = {
      nombre_id: 1
    }
    getVariedades(data);
  }, [])

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
        Variedad:
      </Typography>
      <FormControl size="small">
        <Select
          labelId="variedad"
          id="variedad"
          value={selectedVariedad}
          variant='outlined'
          onChange={handleChangeVariedad}
          name="variedad"
          sx={{ m: 1, minWidth: 250 }}
        >
          {variedades?.map((e) => (
              <MenuItem key={e.idVariedad} value={e.idVariedad}>
              {e.nombreVariedad}
              </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton onClick={() => handleDelete(i)}>
        <RemoveCircleOutlineIcon style={{ color: "#074F57" }}/>
      </IconButton>
    </Box>
    <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
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
    </Box>
    <Divider/>
    </Box>
  )
}

function PopUpAñadirCampaña({show, setShow}) {
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
    })

    const [newCampaña, setNewCampaña] = React.useState({
      nombre: "",
      descripcion: "",
      fechaIni: "",
      fechaFin: "",
      estado: 1,
      cultivos: [],
    })

    const handleCloseSnackbar = () => setSnackbar(null);
    const handleClose = async() => {
      limpiarDatos();
      setShow(false);
    };

    const [selectedCultivo, setSelectedCultivo] = React.useState(1);
    const handleChangeCultivo = (e) => {
      setSelectedCultivo(e.target.value);
    }

    const [cultivos, setCultivos] = React.useState([{
      idCultivo: 1,
      fechaCosecha: dayjs(),
      idVariedad: 1,
    }]);

    const handleAddCultivo = () => {
      const newCultivo = {
        idCultivo: 1,
        fechaCosecha: dayjs(),
        idVariedad: 1,
      }
      console.log(cultivos.length)
      if(cultivos.length < 3) setCultivos(v => [...v, newCultivo])
    }

    const addCampaña = async(data) => {
      let nuevaCampaña = {
        nombre: nombre,
        descripcion: descripcion,
        fechaIni: fechaIni,
        fechaFin: fechaFin,
        estado: 1,
      }
      setSelectedCampaña(nuevaCampaña);
      console.log(nuevaCampaña);
      const result = await insertarCampaña(data);
      if (result.status == 200) {
        cultivos.map((cultivo, index) => {
          let newCultivo = {
            idCampaña: 0,
            idCultivo: cultivo.idCultivo,
            idVariedad: cultivo.idVariedad,
            fechCosecha: cultivo.fechaCosecha,
            estado: 1,
          }
        })
        console.log("Se editó con éxito la base de datos");
        console.log(result)
        setSnackbar({ children: 'Dato editado correctamente', severity: 'success' });
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
        idCultivo: 1,
        fechaCosecha: dayjs(),
        idVariedad: 1,
      }]);
    }

    React.useEffect(() => {
      newCampaña.nombre = nombre;
      newCampaña.descripcion = descripcion;
      newCampaña.fechaIni = fechaIni;
      newCampaña.fechaFin = fechaFin;
      newCampaña.cultivos = cultivos;
      console.log(newCampaña)
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

export default PopUpAñadirCampaña