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
import { insertarCampaña, insertarPesticida, listarPlagas, listarVariedadesXCultivo } from '../../services/adminService';

function Plagas({plaga, i, plagas, setPlagas}){
  const [selectedCultivo, setSelectedCultivo] = React.useState(1);
  let [selectedPlaga, setSelectedPlaga] = React.useState({
    idPlaga: 1,
    nombrePlaga: "",
  });
  const [dosisRec, setDosisRec] = React.useState(1);
  const [unidadRec, setUnidadRec] = React.useState(1);
  const [periodoCarencia, setPeriodoCarencia] = React.useState(1);
  const [periodoReingreso, setPeriodoReingreso] = React.useState(1);
  let [arrayPlagas, setArrayPlagas] = React.useState([]);

  const handleChangeCultivo = (e) => {
    plaga.Cultivo_idCultivo = e.target.value;
    setSelectedCultivo(e.target.value);
  }

  const handleDelete = (e) => {
    plagas.splice(e, 1);
    setPlagas(oldArray => {
      return oldArray.filter((value, i) => i !== e)
    })
    console.log(e, plagas)
  }

  const getPlagas = () => {
    listarPlagas().then((response) => {
        setArrayPlagas(response.data?.Plaga)
        arrayPlagas = response.data?.Plaga
        setSelectedPlaga(arrayPlagas[0])
      })
  }

  React.useEffect(() => {
    getPlagas();
    console.log("PLAGA", selectedPlaga)
  }, [])

  React.useEffect(() => {
    plaga.estado = 1 
    if(selectedPlaga !== undefined) plaga.Plaga_idPlaga = selectedPlaga.idPlaga
    plaga.dosisRec = dosisRec
    plaga.unidadRec = unidadRec
    plaga.periodoCarencia = periodoCarencia
    plaga.periodoReingreso = periodoReingreso
    plaga.Cultivo_idCultivo = selectedCultivo
    console.log(plaga);
  }, [selectedPlaga, dosisRec, unidadRec, periodoCarencia, periodoReingreso, selectedCultivo])

  return(
    <Box>
      <Box display='flex' sx={{ flexDirection: 'row' }}>
      <Box display='flex' sx={{ flexDirection: 'column' }}>
      <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
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
            sx={{ m: 1, minWidth: 250 }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%', ml: 2 }}>
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
        </Box>
        </Box>
        <Box display='flex' sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%', mr: 2 }}>
        <Typography>
            Dosis:
        </Typography>
        <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, minWidth: 250 }} value={dosisRec} onChange={(e) => setDosisRec(e.target.value)}/>
        </Box>
        <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
        <Typography>
            Unidad:
        </Typography>
        <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, minWidth: 250 }} value={unidadRec} onChange={(e) => setUnidadRec(e.target.value)}/>
        </Box>
        </Box>
        <Box display='flex' sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%', mr: 2 }}>
        <Typography>
            Periodo carencia:
        </Typography>
        <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, minWidth: 250 }} value={periodoCarencia} onChange={(e) => setPeriodoCarencia(e.target.value)}/>
        </Box>
        <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
        <Typography>
            Periodo reingreso:
        </Typography>
        <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, minWidth: 250 }} value={periodoReingreso} onChange={(e) => setPeriodoReingreso(e.target.value)}/>
        </Box>
        </Box>
      </Box>
      <Box>
        <IconButton onClick={() => handleDelete(i)}>
          <RemoveCircleOutlineIcon style={{ color: "#074F57" }}/>
        </IconButton>
      </Box>
      </Box>
      
    <Divider/>
    </Box>
  )
}

function PopUpAñadirPesticida({show, setShow}) {
    const [snackbar, setSnackbar] = React.useState(null);

    const [nombre, setNombre] = React.useState("");
    const [descripcion, setDescripcion] = React.useState("");
    const [material, setMaterial] = React.useState("");
    const [recomendaciones, setRecomendaciones] = React.useState("");
    const [metodoAplicacion, setMetodoAplicacion] = React.useState("Aspersión");
    const [toxicidad, setToxicidad] = React.useState("");

    const handleCloseSnackbar = () => setSnackbar(null);
    const handleClose = async() => {
      limpiarDatos();
      setShow(false);
    };

    const handleChangeMetodo = (e) => {
      setMetodoAplicacion(e.target.value);
    }

    const [plagas, setPlagas] = React.useState([{
      estado: 1, 
      Plaga_idPlaga: 1,
      dosisRec: 1, 
      unidadRec: "",
      periodoCarencia: 1,
      periodoReingreso: 1,
      Cultivo_idCultivo: 1,
    }]);

    const handleAddPlaga = () => {
      const newPlaga = {
        estado: 1, 
        Plaga_idPlaga: 1,
        dosisRec: 1, 
        unidadRec: "",
        periodoCarencia: 1,
        periodoReingreso: 1,
        Cultivo_idCultivo: 1,
      }
      console.log(plagas.length)
      if(plagas.length < 5) setPlagas(v => [...v, newPlaga])
    }

    const [selectedPesticida, setSelectedPesticida] = React.useState({
        nombrePeticida: "",
        descripcion: "",
        material: "",
        recomendaciones: "",
        metodoAplicacion: "",
        toxicidad: "",
        estado: 1,
    })
    const addNewPesticida = async(data) => {
      const result = await insertarPesticida(data);
      if (result.status == 200) {
        console.log("Se insertó con éxito la base de datos");
        console.log(result)
        setSnackbar({ children: 'Dato insertado correctamente', severity: 'success' });
      }
      else {
        alert('Algo salio mal al guardar el dato');
      }
      limpiarDatos();
      setShow(false);
    }

    const limpiarDatos = () => {
      setNombre("");
      setDescripcion("");
      setMaterial("");
      setMetodoAplicacion("");
      setRecomendaciones("");
      setToxicidad("");
      setPlagas([{
        estado: 1, 
        Plaga_idPlaga: 1,
        dosisRec: 1, 
        unidadRec: "",
        periodoCarencia: 1,
        periodoReingreso: 1,
        Cultivo_idCultivo: 1,
      }]);
    }

    React.useEffect(() => {
      let newPesticida = {
        descripcion: descripcion,
        material: material,
        metodoAplicacion: metodoAplicacion,
        nombrePeticida: nombre,
        recomendaciones: recomendaciones,
        toxicidad: parseInt(toxicidad),
        plagas: plagas,
      }
      setSelectedPesticida(newPesticida)
      console.log(selectedPesticida)
    }, [nombre, descripcion, material, material, recomendaciones, toxicidad, plagas])

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
            {"Nuevo pesticida"}
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
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography sx={{ mt: 1 }}>
                Material:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '80%' }} value={material} onChange={(e) => setMaterial(e.target.value)}/>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', alignItems: 'center' }}>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography>
                Método de aplicación:
              </Typography>
              <FormControl size="small" sx={{ m: 1, minWidth: 250 }}>
                <Select
                labelId="metodo"
                id="metodo"
                value={metodoAplicacion}
                variant='outlined'
                onChange={handleChangeMetodo}
                name="metodo"
                >
                  <MenuItem value={"Aspersión"}>
                    {"Aspersión"}
                  </MenuItem>
                  <MenuItem value={"Pulverización"}>
                    {"Pulverización"}
                  </MenuItem>
                  <MenuItem value={"Espolvoreo"}>
                    {"Espolvoreo"}
                  </MenuItem>
                  <MenuItem value={"Riego"}>
                    {"Riego"}
                  </MenuItem>
                </Select>
            </FormControl>
              </Box>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography sx={{ ml: 2 }}>
                Toxicidad:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, minWidth: 250 }} value={toxicidad} onChange={(e) => setToxicidad(e.target.value)}/>
              </Box>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography sx={{ mt: 1 }}>
                Recomendaciones:
              </Typography>
              <TextField id="standard-basic" multiline rows={2} variant="outlined" size="small" sx={{ m: 1, width: '80%' }} value={recomendaciones} onChange={(e) => setRecomendaciones(e.target.value)}/>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ color: '#103A5E' }}>
                Plaga(s):
              </Typography>
              <IconButton
                onClick={handleAddPlaga}
              >
                <AddCircleOutlineIcon style={{ color: "#074F57" }}/>
              </IconButton>
            </Box>
            <Divider/>
            
            {plagas.map((plaga, i) => 
              <Plagas
                plaga={plaga}
                i={i}
                plagas={plagas}
                setPlagas={setPlagas}
              />
            )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: '#074F57' }}>Cancelar</Button>
            <Button onClick={() => addNewPesticida(selectedPesticida)} variant="contained" sx={{ backgroundColor: '#074F57' }}>
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

export default PopUpAñadirPesticida