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
import { insertarPlaga, listarEvaluaciones, listarEvaluadores, listarLotes, listarPlagas, listarVariedades, listarVariedadesXCultivo, modificarEvaluacion } from '../../services/adminService';
import moment from 'moment';

function PopUpModificarEvaluacion({fechaInicio, show, setShow, row}) {
    const [showSection, setShowSection] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState(null);

    let [evaluador, setEvaluador] = React.useState({
      idUsuario: row.idUsuario,
    });
    const [descripcion, setDescripcion] = React.useState(row.descripcion);
    let [lote, setLote] = React.useState({
      idLote: row.idLote,
    });
    const [cantidadEncontrada, setCantidadEncontrada] = React.useState(row.cantEncontrada);
    const [gravedad, setGravedad] = React.useState(row.gravedad);
    let [selectedPlaga, setSelectedPlaga] = React.useState({
      idPlaga: row.idPlaga,
    });
    const [cultivo, setCultivo] = React.useState(row.idCultivo);
    const [variedad, setVariedad] = React.useState(row.idVariedad);
    let [arrayPlagas, setArrayPlagas] = React.useState([]);
    const [selectedEvaluacion, setSelectedEvaluacion] = React.useState("");

    const handleCloseSnackbar = () => setSnackbar(null);
    const handleClose = async() => {
      setShow(false);
    };

    const addNewEvaluacion = async(data) => {
      const result = await modificarEvaluacion(data);
      if (result.status == 200) {
        console.log("Se editó con éxito la base de datos");
        console.log(result)
        setSnackbar({ children: 'Dato editado correctamente', severity: 'success' });
      }
      else {
        alert('Algo salio mal al guardar el dato');
      }
      setShow(false);
    };

    const handleChangeCultivo = (e) => {
        setCultivo(e.target.value);
        let id = {
          nombre_id: e.target.value
        }
      }
  
      const handleChangeVariedad = (e) => {
          setVariedad(e.target.value);
        }

    let [evaluadores, setEvaluadores] = React.useState([]);
    const getEvaluadores = () => {
        listarEvaluadores().then((response) => {
            setEvaluadores(response.data?.Usuario)
            evaluadores = response.data?.Usuario
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
    const getVariedades = () => {
        listarVariedades().then((response) => {
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
        if(selectedPlaga !== undefined){
          console.log(selectedPlaga.cantGrave, selectedPlaga.cantMedio, selectedPlaga.cantLeve)
            if((selectedPlaga.cantGrave) < parseInt(cantidadEncontrada)) 
              setGravedad("3");
            if((selectedPlaga.cantLeve) <= parseInt(cantidadEncontrada) && (selectedPlaga.cantGrave) >= parseInt(cantidadEncontrada)) 
              setGravedad("2");
            if((selectedPlaga.cantLeve) > parseInt(cantidadEncontrada)) 
              setGravedad("1");
        }
      }, [cantidadEncontrada, selectedPlaga])

    React.useEffect(() => {
        let data = {
            nombre_id: row.idCultivo,
        }
        getEvaluadores();
        getLotes();
        getPlagas();
        getVariedades();
    }, [])

    React.useEffect(() => {
      const selectedEvaluador = evaluadores.filter((entry) => entry.idUsuario === row.idUsuario);
      const selectedLote = lotes.filter((entry) => entry.idLote === row.idLote);
      const plaga = arrayPlagas.filter((entry) => entry.idPlaga === row.idPlaga);
      console.log(selectedEvaluador)
      setEvaluador(selectedEvaluador[0]);
      setDescripcion(row.descripcion);
      setLote(selectedLote[0]);
      setCantidadEncontrada(row.cantEncontrada);
      setGravedad(row.gravedad);
      setSelectedPlaga(plaga[0]);
      setCultivo(row.idCultivo);
      setVariedad(row.idVariedad);
    }, [row])

    

    React.useEffect(() => {
      console.log("LOTE", lote)
      if(lote !== undefined && selectedPlaga !== undefined && evaluador !== undefined){
        let newEvaluacion = {
          idEvaluacion: row.idEvaluacion,
          descripcion: descripcion,
          fecha: row.fecha,
          idCampañaXLote: lote.idLote,
          semana: row.semana,
          cantEncontrada: parseInt(cantidadEncontrada),
          idPlaga: selectedPlaga.idPlaga,
          gravedad: parseInt(gravedad),
          idUsuario: evaluador.idUsuario,
          idPerfil: evaluador.Perfil_idPerfil,
          estado: 1,
        }
        setSelectedEvaluacion(newEvaluacion)
        console.log(newEvaluacion)
        }
        
    }, [descripcion, lote, evaluador, selectedPlaga, gravedad, cantidadEncontrada, cultivo, variedad])


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
            {"Modificar evaluación"}
            <Divider/>
          </DialogTitle>
          <DialogContent>
            <Box display='flex' sx={{ flexDirection: 'column' }}>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>
                Evaluador:
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size='small'
                options={evaluadores}
                value={evaluador}
                onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  setEvaluador({
                      idUsuario: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setEvaluador({
                      idUsuario: newValue.inputValue,
                    });
                    } else {
                      setEvaluador(newValue);
                      evaluador = newValue;
                    }
                    console.log(evaluador)
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    isOptionEqualToValue={(option, value) => option.idUsuario === value.idUsuario}
                    getOptionLabel={(option) => `${option.nombres} ${option.apellidoPat} ${option.apellidoMat}`}
                    sx={{ m: 1, width: '80%' }}
                    renderInput={(params) => <TextField {...params} />}
                />
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
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size='small'
                options={lotes}
                value={lote}
                onChange={(event, newValue) => {
                  console.log(event, newValue)
                if (typeof newValue === 'string') {
                  setLote({
                    nombreLote: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setLote({
                      nombreLote: newValue.inputValue,
                    });
                    } else {
                      setLote(newValue);
                      lote = newValue;
                    }
                    console.log(lote)
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    getOptionKey={(option) => option.idLote}
                    getOptionLabel={(option) => option.nombreLote}
                    sx={{ m: 1, width: '80%' }}
                    renderInput={(params) => <TextField {...params} />}
                />
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
                disabled
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
                disabled
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
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '60%' }} disabled value={gravedad} onChange={(e) => setGravedad(e.target.value)}/>
              </Box>
            </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: '#074F57' }}>Cancelar</Button>
            <Button onClick={() => addNewEvaluacion(selectedEvaluacion)} variant="contained" sx={{ backgroundColor: '#074F57' }}>
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

export default PopUpModificarEvaluacion