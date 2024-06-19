import React from 'react'
import { Alert, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Snackbar, Typography, Autocomplete } from '@mui/material';
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
import { insertarPlaga, listarEvaluaciones, listarEvaluadores, listarLotes, listarPlagas, listarVariedadesXCultivo } from '../../services/adminService';

function PopUpAñadirEvaluacion({show, setShow}) {
    const [showSection, setShowSection] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState(null);

    const [evaluador, setEvaluador] = React.useState(1);
    const [descripcion, setDescripcion] = React.useState("");
    const [lote, setLote] = React.useState("");
    const [cantidadEncontrada, setCantidadEncontrada] = React.useState("");
    const [gravedad, setGravedad] = React.useState("");
    let [selectedPlaga, setSelectedPlaga] = React.useState(null);
    const [cultivo, setCultivo] = React.useState(1);
    const [variedad, setVariedad] = React.useState(1);
    let [arrayPlagas, setArrayPlagas] = React.useState([]);

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
        setEvaluador("");
        setDescripcion("");
        setLote("");
        setCantidadEncontrada("");
        setGravedad("");
        setSelectedPlaga(null);
    }

    const handleChangeCultivo = (e) => {
        setCultivo(e.target.value);
        let id = {
          nombre_id: e.target.value
        }
        getVariedades(id);
      }
  
      const handleChangeVariedad = (e) => {
          setVariedad(e.target.value);
        }

    React.useEffect(() => {
      let newEvaluacion = {
        descripcion: descripcion,
        fecha: new Date(),
        estado: 1,
      }
      setSelectedPlaga(newEvaluacion);
      console.log(selectedPlaga);
    }, [descripcion])

    let [evaluadores, setEvaluadores] = React.useState([]);
    const getEvaluadores = () => {
        listarEvaluadores().then((response) => {
            setEvaluadores(response.data?.Evaluador)
            evaluadores = response.data?.Evaluador
          })
    }

    let [lotes, setLotes] = React.useState([]);
    const getLotes = () => {
        listarLotes().then((response) => {
            setLotes(response.data?.Lote)
            lotes = response.data?.Lote
          })
    }

    let [variedades, setVariedades] = React.useState([]);
    const getVariedades = (id) => {
        listarVariedadesXCultivo(id).then((response) => {
            setVariedades(response.data?.Cultivo)
            variedades = response.data?.Cultivo
          })
    }

    const getPlagas = () => {
        listarPlagas().then((response) => {
            setArrayPlagas(response.data?.Plaga)
            arrayPlagas = response.data?.Plaga
          })
      }

    React.useEffect(() => {
        let data = {
            nombre_id: 1,
        }
        getEvaluadores();
        getLotes();
        getPlagas();
        getVariedades(data);
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
            {"Nueva evaluación"}
            <Divider/>
          </DialogTitle>
          <DialogContent>
            <Box display='flex' sx={{ flexDirection: 'column' }}>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>
                Evaluador:
              </Typography>
              <FormControl size="small" sx={{ m: 1, width: '80%' }}>
                <Select
                labelId="evaluador"
                id="evaluador"
                value={evaluador}
                variant='outlined'
                onChange={(e) => setEvaluador(e.target.value)}
                name="evaluador"
                >
                  <MenuItem key={1} value={1}>
                    {"Federico Garcia Aranda"}
                    </MenuItem>
                </Select>
            </FormControl>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography sx={{ mt: 1 }}>
                Descripción:
              </Typography>
              <TextField id="standard-basic" multiline rows={2} variant="outlined" size="small" sx={{ m: 1, width: '80%' }} value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>
                Lote:
              </Typography>
              <FormControl size="small" sx={{ m: 1, width: '80%' }}>
                <Select
                labelId="lote"
                id="lote"
                value={lote}
                variant='outlined'
                onChange={(e) => setLote(e.target.value)}
                name="lote"
                >
                {lotes?.map((e) => (
                    <MenuItem key={e.idLote} value={e.idLote}>
                    {e.nombreLote}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography>
                Cultivo afectado:
              </Typography>
              <FormControl size="small" sx={{ m: 1, width: '60%' }}>
                <Select
                labelId="fundo"
                id="fundo"
                value={cultivo}
                variant='outlined'
                onChange={handleChangeCultivo}
                name="fundo"
                
                >
                <MenuItem key={1} value={1}>{"Uva"}</MenuItem>
                <MenuItem key={2} value={2}>{"Palta"}</MenuItem>
                <MenuItem key={3} value={3}>{"Arándano"}</MenuItem>
                </Select>
            </FormControl>
              </Box>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography sx={{ ml: 2 }}>
                Variedad:
              </Typography>
              <FormControl size="small" sx={{ m: 1, width: '60%' }}>
                <Select
                labelId="fundo"
                id="fundo"
                value={variedad}
                variant='outlined'
                onChange={handleChangeVariedad}
                name="fundo"
                >
                {variedades?.map((e) => (
                    <MenuItem key={e.idVariedad} value={e.idVariedad}>
                    {e.nombreVariedad}
                    </MenuItem>
                ))}
                </Select>
              </FormControl>
              </Box>
            </Box>
            <Box display='flex' sx={{ mt: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ color: '#103A5E' }}>
                Plaga encontrada:
              </Typography>
            </Box>
            <Divider/>
            <Box display='flex' sx={{ mt: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>
                Plaga:
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size='small'
                options={arrayPlagas}
                value={selectedPlaga}
                onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setSelectedPlaga({
                    nombrePlaga: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setSelectedPlaga({
                    nombrePlaga: newValue.inputValue,
                    });
                    } else {
                        setSelectedPlaga(newValue);
                        selectedPlaga = newValue;
                    }
                    console.log(selectedPlaga)
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    getOptionKey={(option) => option.idPlaga}
                    getOptionLabel={(option) => option.nombrePlaga}
                    sx={{ m: 1, width: '80%' }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography>
                Cantidad encontrada:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '60%' }} value={cantidadEncontrada} onChange={(e) => setCantidadEncontrada(e.target.value)}/>
              </Box>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography sx={{ ml: 2 }}>
                Gravedad:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '60%' }} value={gravedad} onChange={(e) => setGravedad(e.target.value)}/>
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

export default PopUpAñadirEvaluacion