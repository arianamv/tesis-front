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
import { getCampañaXLote, insertarEvaluacion, insertarPlaga, listarEvaluaciones, listarEvaluadores, listarLotes, listarPlagas, listarVariedades, listarVariedadesXCultivo } from '../../services/adminService';
import { LegendToggle } from '@mui/icons-material';
import moment from 'moment';

function PopUpAñadirEvalEval({state, show, setShow, selectedCampaña}) {
    const [showSection, setShowSection] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState(null);

    let [evaluador, setEvaluador] = React.useState({
      idUsuario: 1,
      Perfil_idPerfil: 1,
    });
    const [descripcion, setDescripcion] = React.useState("");
    let [lote, setLote] = React.useState({
      idLote: 1
    });
    const [cantidadEncontrada, setCantidadEncontrada] = React.useState("");
    const [gravedad, setGravedad] = React.useState("");
    let [selectedPlaga, setSelectedPlaga] = React.useState({
      idPlaga: 1
    });
    const [cultivo, setCultivo] = React.useState(1);
    const [variedad, setVariedad] = React.useState(1);
    let [arrayPlagas, setArrayPlagas] = React.useState([]);

    let fechaInicio = "2024-06-01"

    const handleCloseSnackbar = () => setSnackbar(null);
    const handleClose = async() => {
      limpiarDatos();
      setShow(false);
    };

    const [selectedEvaluacion, setSelectedEvaluacion] = React.useState("");

    const addNewEvaluacion = async(data) => {
      const result = await insertarEvaluacion(data);
      if (result.status == 200) {
        console.log("Se editó con éxito la base de datos");
        console.log(result)
        setSnackbar({ children: 'Dato insertado correctamente', severity: 'success' });
      }
      else {
        alert('Algo salio mal al guardar el dato');
      }
      limpiarDatos();
      setShow(false);
    };

    const limpiarDatos = () => {
        setEvaluador({
          idUsuario: 1,
          Perfil_idPerfil: 1,
        });
        setDescripcion("");
        setLote({
          idLote: 1
        });
        setCantidadEncontrada("");
        setGravedad("");
        setSelectedPlaga({
          idPlaga: 1
        });
    }

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
            const newEvaluador = evaluadores.filter((entry) => entry.idUsuario === state.usuario.idUsuario);
            setEvaluador(newEvaluador[0]);
            console.log("evaluador",evaluador)
          })
    }

    let [lotes, setLotes] = React.useState([]);
    const getLotes = () => {
        listarLotes().then((response) => {
            setLotes(response.data?.Lote)
            lotes = response.data?.Lote
            setLote(response.data?.Lote[0])
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
            setSelectedPlaga(response.data?.Plaga[0])
          })
      }

    React.useEffect(() => {
      setEvaluador({
        idUsuario: 1,
        Perfil_idPerfil: 1,
      });
      setDescripcion("");
      setLote({
        idLote: 1
      });
      setCantidadEncontrada("");
      setGravedad("");
      setSelectedPlaga({
        idPlaga: 1
      });
    }, [])

    React.useEffect(() => {
        let data = {
            nombre_id: 1,
        }
        getEvaluadores();
        getLotes();
        getPlagas();
        getVariedades();
        let dataCam = {
          idCampaña: selectedCampaña,
          idLote: 1
        }
        getCampaña(dataCam)
    }, [])

    let [campaña, setCampaña] = React.useState([{
      Variedad_Cultivo_idCultivo: 1,
      Variedad_idVariedad: 1,
    }]);
    const getCampaña = (data) => {
      getCampañaXLote(data).then((response) => {
        setCampaña(response.data?.Campaña);
        campaña = response.data?.Campaña
      })
    }

    React.useEffect(() => {
      let data = {
        idCampaña: selectedCampaña,
        idLote: lote.idLote
      }
      
      getCampaña(data)
      console.log(campaña)
      setCultivo(campaña[0].Variedad_Cultivo_idCultivo)
      setVariedad(campaña[0].Variedad_idVariedad)
    }, [lote])

    React.useEffect(() => {
      console.log(evaluador)
        let newEvaluacion = {
          descripcion: descripcion,
          fecha: dayjs(),
          idCampañaXLote: lote.idLote,
          semana: moment().week() - moment(fechaInicio).week(),
          cantEncontrada: parseInt(cantidadEncontrada),
          idPlaga: selectedPlaga.idPlaga,
          gravedad: parseInt(gravedad),
          idUsuario: evaluador.idUsuario,
          idPerfil: evaluador.Perfil_idPerfil,
          estado: 1,
        }
        setSelectedEvaluacion(newEvaluacion)
        console.log(newEvaluacion)
    }, [descripcion, lote, evaluador, selectedPlaga, gravedad, cantidadEncontrada, cultivo, variedad])

    React.useEffect(() => {
      if(selectedPlaga !== null){
        if((selectedPlaga.cantGrave) < parseInt(cantidadEncontrada)) 
          setGravedad("3");
        if((selectedPlaga.cantLeve) <= parseInt(cantidadEncontrada) && (selectedPlaga.cantGrave) >= parseInt(cantidadEncontrada)) 
          setGravedad("2");
        if((selectedPlaga.cantLeve) > parseInt(cantidadEncontrada)) 
          setGravedad("1");
      }
      console.log(selectedPlaga)
    }, [cantidadEncontrada, selectedPlaga])

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
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size='small'
                options={evaluadores}
                value={evaluador}
                disabled
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
                    getOptionKey={(option) => option.idUsuario}
                    getOptionLabel={(option) => (option.nombres + " " + option.apellidoPat + " " + option.apellidoMat) || ""}
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
                    getOptionLabel={(option) => option.nombreLote || ""}
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
                value={variedad}
                variant='outlined'
                disabled
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
                    getOptionLabel={(option) => option.nombrePlaga || ""}
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

export default PopUpAñadirEvalEval