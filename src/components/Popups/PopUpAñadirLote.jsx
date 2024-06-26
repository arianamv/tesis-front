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
import { insertarLote, listarLoteXFundo, listarLotes, listarLotesXCampañaXFundo, listarVariedadesXCultivo } from '../../services/adminService';
import MapViewPopUp from '../MapViewPopUpEdit';
import MapViewPopUpAñadir from '../MapViewPopUpAñadir';

function PopUpAñadirLote({show, setShow, cultivos, campañas, variedades, setVariedades, fundos}) {
    const [showSection, setShowSection] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState(null);

    const [nombre, setNombre] = React.useState("");
    const [descripcion, setDescripcion] = React.useState("");
    const [cultivo, setCultivo] = React.useState(1);
    const [variedad, setVariedad] = React.useState(1);
    const [numSurcos, setNumSurcos] = React.useState("");
    const [numPlantas, setNumPlantas] = React.useState("");
    const [campaña, setCampaña] = React.useState(1);
    const [fundo, setFundo] = React.useState(1);
    const [selectedFundo, setSelectedFundo] = React.useState([{
      idFundo: 1,
    }]);
    let [lotes, setLotes] = React.useState([{
      idLote: 1,
    }]);

    const [newCampaña, setNewCampaña] = React.useState({
      nombre: "",
      descripcion: "",
      cultivo: "",
      variedad: "",
      numSurcos: "",
      numPlantas: "",
      campaña: "",
      idFundo: "",
      estado: 1,
    })


    const handleCloseSnackbar = () => setSnackbar(null);
    const handleClose = async() => {
      limpiarDatos();
      setShow(false);
    };

    const limpiarDatos = () => {
      setNombre("");
      setDescripcion("");
      setCultivo(1);
      setVariedad(1);
      setNumPlantas("");
      setNumSurcos("");
      setFundo(1);
    }

    const [tamanio, setTamanio] = React.useState(1);
    const [coordenadas, setCoordenadas] = React.useState([{
        idCoordenada: 1,
        latitud: 0, 
        longitud: 0, 
        estado: 1,  
        Lote_Fundo_idFundo: fundo,
    }])

    const [selectedLote, setSelectedLote] = React.useState("");

    React.useEffect(() => {
      let newLote = {
        nombreLote: nombre,
        descripcion: descripcion,
        tamanio: tamanio/10000,
        estado: 1,
        Fundo_idFundo: fundo,
        campaña: [{
          estado: 1,
          Lote_Fundo_idFundo: fundo,
          numPlantas: numPlantas,
          numSurcos: numSurcos,
          Variedad_idVariedad: variedad,
          Variedad_Cultivo_idCultivo: cultivo,
          Campaña_idCampaña: campaña,
        }],
        coordenadas: coordenadas,
      }
      setSelectedLote(newLote);
      console.log(selectedLote);
    }, [nombre, descripcion,tamanio, cultivo, variedad, numPlantas, numSurcos, fundo])

    const addNewLote = async(data) => {
      const result = await insertarLote(data);
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

    React.useEffect(() => {
      let data = {
        nombre_id: selectedFundo[0].idFundo
      }
      getLotesXFundo(data);
    }, [])

    React.useEffect(() => {
      let data = {
        nombre_id: selectedFundo[0].idFundo
      }
      console.log(data)
      getLotesXFundo(data);
    }, [selectedFundo])

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

      const handleChangeFundo = (e) => {
        setFundo(e.target.value);
      }

    const getVariedades = (id) => {
        listarVariedadesXCultivo(id).then((response) => {
            setVariedades(response.data?.Cultivo)
            variedades = response.data?.Cultivo
          })
    }

    const getLotesXFundo = (fundo) => {
      listarLoteXFundo(fundo).then((response) => {
        if(response?.data){
          if(response?.data.Lote){
            let auxLotes = [];
            for(let i = 0; i < response?.data?.Lote?.length; i++){
              auxLotes.push({
                idLote: response?.data.Lote[i].idLote,
                nombreLote: response?.data.Lote[i].nombreLote,
                descripcion: response?.data.Lote[i].descripcion,
                tamanio: response?.data.Lote[i].tamanio,
                estado: response?.data.Lote[i].estado,
                idFundo: response?.data.Lote[i].Fundo_idFundo,
                coordenadas: response?.data.Lote[i].coordenadas,
              })
            }
            setLotes(auxLotes);
            lotes = auxLotes;
            console.log(response)
          }
        }
      })
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
            {"Nuevo lote"}
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
            <Box display='flex' sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ color: '#103A5E' }}>
                Datos de campaña:
              </Typography>
            </Box>
            <Divider/>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>
                Campaña:     
              </Typography>
              <FormControl size="small" sx={{ m: 1, width: '80%' }}>
                <Select
                labelId="fundo"
                id="fundo"
                value={campaña}
                variant='outlined'
                onChange={(e) => setCampaña(e.target.value)}
                name="fundo"
                >
                {campañas?.map((e) => (
                    <MenuItem key={e.idCampaña} value={e.idCampaña}>
                    {e.nombre}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            </Box>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography>
                Cultivo:
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
                {cultivos?.map((e) => (
                    <MenuItem key={e.idCultivo} value={e.idCultivo}>
                    {e.nombreCultivo}
                    </MenuItem>
                ))}
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
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography>
                N° plantas:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '60%' }} value={numPlantas} onChange={(e) => setNumPlantas(e.target.value)}/>
              </Box>
              <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <Typography sx={{ ml: 2 }}>
                N° surcos:
              </Typography>
              <TextField id="standard-basic" variant="outlined" size="small" sx={{ m: 1, width: '60%' }} value={numSurcos} onChange={(e) => setNumSurcos(e.target.value)}/>
              </Box>
            </Box>
            
            
            <Box display='flex' sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ color: '#103A5E' }}>
                Dibujar en mapa:
              </Typography>
            </Box>
            <Divider/>
            <Box display='flex' sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>
                Fundo:     
              </Typography>
              <FormControl size="small" sx={{ m: 1, width: '80%' }}>
                <Select
                labelId="fundo"
                id="fundo"
                value={fundo}
                variant='outlined'
                onChange={(e) => setFundo(e.target.value)}
                name="fundo"
                >
                {fundos?.map((e) => (
                    <MenuItem key={e.idFundo} value={e.idFundo}>
                    {e.nombreFundo}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            </Box>
            <MapViewPopUpAñadir
              fundo={fundo}
              fundos={fundos}
              lotes={lotes}
              selectedFundo={selectedFundo}
              setSelectedFundo={setSelectedFundo}
              coordenadas={coordenadas}
              setCoordenadas={setCoordenadas}
              tamanio={tamanio}
              setTamanio={setTamanio}
            />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: '#074F57' }}>Cancelar</Button>
            <Button onClick={() => addNewLote(selectedLote)} variant="contained" sx={{ backgroundColor: '#074F57' }}>
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

export default PopUpAñadirLote