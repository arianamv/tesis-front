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
import { insertarPlaga, listarEvaluaciones, listarEvaluadores, listarLotes, listarPesticidas, listarPlagas, listarVariedadesXCultivo, modificarAplicacion } from '../../services/adminService';
import moment from 'moment';

function PopUpModificarAplicacion({show, setShow, row}) {
    const [showSection, setShowSection] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState(null);

    const [evaluador, setEvaluador] = React.useState(1);
    const [descripcion, setDescripcion] = React.useState("");
    let [lote, setLote] = React.useState({
        idLote: 1,
    });
    const [cantidadAplicada, setCantidadAplicada] = React.useState(row.cantidadAplicada);
    const [unidadAplicada, setUnidadAplicada] = React.useState(row.unidadAplicada);
    let [selectedAplicacion, setSelectedAplicacion] = React.useState("");
    const [area, setArea] = React.useState("");
    const [variedad, setVariedad] = React.useState(1);
    let [arrayPlagas, setArrayPlagas] = React.useState([]);
    let [pesticida, setPesticida] = React.useState({
        idPesticida: 1,
    });
    const [selectedFecha, setSelectedFecha] = React.useState(dayjs(row.fecha));

    const handleCloseSnackbar = () => setSnackbar(null);
    const handleClose = async() => {
      setShow(false);
    };

    const addNewPlaga = async(data) => {
      const result = await modificarAplicacion(data);
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

    const limpiarDatos = () => {
        setLote({
            idLote: 1,
        });
        setPesticida({
            idPesticida: 1,
        });
        setArea("");
        setSelectedFecha(dayjs());
        setCantidadAplicada("");
        setUnidadAplicada("");
      }

    React.useEffect(() => {
        const selectedLote = lotes.filter((entry) => entry.idLote === row.idLote);
        const selectedPesticida = pesticidas.filter((entry) => entry.idPesticida === row.idPesticida);
        setLote(selectedLote[0]);
        setPesticida(selectedPesticida[0]);
        setSelectedFecha(dayjs(row.fecha))
        setArea(row.area)
        setCantidadAplicada(row.cantidadAplicada);
        setUnidadAplicada(row.unidadAplicada);
    }, [row])

    let fechaInicio = '2024-06-01'
  
    React.useEffect(() => {
        if(lote !== undefined && pesticida !== undefined){
        let newAplicacion = {
          idADP: row.idADP,
          fecha: dayjs(selectedFecha),
          area: area,
          cantidadAplicada: cantidadAplicada,
          unidadAplicada: unidadAplicada,
          semana: moment().week() - moment(fechaInicio).week(),
          idCampañaXLote: lote.idLote,
          idPesticida: pesticida.idPesticida,
          estado: 1,
        }
        setSelectedAplicacion(newAplicacion);
        console.log(selectedAplicacion);
        }
      }, [selectedFecha, area, cantidadAplicada,unidadAplicada,lote,pesticida])

    let [evaluadores, setEvaluadores] = React.useState([]);
    const getEvaluadores = () => {
        listarEvaluadores().then((response) => {
            setEvaluadores(response.data?.Evaluador)
            evaluadores = response.data?.Evaluador
          })
    }

    let [lotes, setLotes] = React.useState([{
        idLote: 1,
    }]);
    const getLotes = () => {
        listarLotes().then((response) => {
            setLotes(response.data?.Lote)
            lotes = response.data?.Lote
          })
    }

    const handleChangeFecha = (e) => {
        setSelectedFecha(e);
      }

    let [pesticidas, setPesticidas] = React.useState([{
        idPesticida: 1,
    }]);
    const getPesticidas = () => {
        listarPesticidas().then((response) => {
          setPesticidas(response.data?.Pesticida)
          pesticidas = response.data?.Pesticida
        })
    }

    React.useEffect(() => {
        getLotes();
        getPesticidas();
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
            {"Modificar aplicación de pesticida"}
            <Divider/>
          </DialogTitle>
          <DialogContent>
            <Box display='flex' sx={{ flexDirection: 'column' }}>
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
                    getOptionLabel={(option) => option.nombreLote}
                    sx={{ m: 1, width: '80%' }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>
                Pesticida:
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size='small'
                options={pesticidas}
                value={pesticida}
                onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  setPesticida({
                    nombrePeticida: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setPesticida({
                      nombrePeticida: newValue.inputValue,
                    });
                    } else {
                      setPesticida(newValue);
                      lote = newValue;
                    }
                    console.log(lote)
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    getOptionKey={(option) => option.idPesticida}
                    getOptionLabel={(option) => option.nombrePeticida}
                    sx={{ m: 1, width: '80%' }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography>
                Fecha:
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                slotProps={{ textField: { size: 'small' } }}
                sx={{ m: 1, width: 255 }}
                format="DD/MM/YYYY"
                value={selectedFecha}
                onChange={handleChangeFecha}
                />
            </LocalizationProvider>
              </Box>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography sx={{ ml: 2 }}>
                Área:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '60%' }} value={area} onChange={(e) => setArea(e.target.value)}/>
              </Box>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography>
                Cantidad aplicada:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '60%' }} value={cantidadAplicada} onChange={(e) => setCantidadAplicada(e.target.value)}/>
              </Box>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography sx={{ ml: 2 }}>
                Unidad:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '60%' }} value={unidadAplicada} onChange={(e) => setUnidadAplicada(e.target.value)}/>
              </Box>
            </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: '#074F57' }}>Cancelar</Button>
            <Button onClick={() => addNewPlaga(selectedAplicacion)} variant="contained" sx={{ backgroundColor: '#074F57' }}>
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

export default PopUpModificarAplicacion