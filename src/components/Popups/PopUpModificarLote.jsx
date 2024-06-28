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
import { listarLoteXFundo, listarLotes, listarLotesXCampañaXFundo, listarVariedadesXCultivo, modificarLote } from '../../services/adminService';
import MapViewPopUp from '../MapViewPopUpEdit';

function PopUpModificarLote({show, setShow, cultivos, row, campañas, variedades, setVariedades, fundos}) {
    const [showSection, setShowSection] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState(null);

    const [nombre, setNombre] = React.useState(row.nombreLote);
    const [descripcion, setDescripcion] = React.useState(row.descripcion);
    const [cultivo, setCultivo] = React.useState(row.idCultivo);
    const [variedad, setVariedad] = React.useState(row.idVariedad);
    const [numSurcos, setNumSurcos] = React.useState(row.numSurcos);
    const [numPlantas, setNumPlantas] = React.useState(row.numPlantas);
    const [campaña, setCampaña] = React.useState(row.idCampaña);
    const [fundo, setFundo] = React.useState(row.idFundo);
    const [selectedFundo, setSelectedFundo] = React.useState([{
      idFundo: row.idFundo,
    }]);
    let [lotes, setLotes] = React.useState([{
      idLote: 1,
    }]);

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

    React.useEffect(() => {
        setNombre(row.nombreLote);
        setDescripcion(row.descripcion);
        setCultivo(row.idCultivo);
        setVariedad(row.idVariedad);
        setNumSurcos(row.numSurcos);
        setNumPlantas(row.numPlantas);
        setCampaña(row.idCampaña);
        setFundo(row.idFundo);
        setCoordenadas(row.coordenadas)
      }, [row])

      React.useEffect(() => {
        setNombre(row.nombreLote);
        setDescripcion(row.descripcion);
        setCultivo(row.idCultivo);
        setVariedad(row.idVariedad);
        setNumSurcos(row.numSurcos);
        setNumPlantas(row.numPlantas);
        setCampaña(row.idCampaña);
        setFundo(row.idFundo);
      }, [])

      const addNewLote = async(data) => {
        const result = await modificarLote(data);
        if (result.status == 200) {
          console.log("Se insertó con éxito la base de datos");
          console.log(result)
          setSnackbar({ children: 'Dato editado correctamente', severity: 'success' });
        }
        else {
          alert('Algo salio mal al guardar el dato');
        }
        setShow(false);
      }

    const [tamanio, setTamanio] = React.useState(1);
    let [coordenadas, setCoordenadas] = React.useState([{
      idCoordenada: 1,
    }])

    const [selectedLote, setSelectedLote] = React.useState("");

      React.useEffect(() => {
        let newLote = {
          idLote: row.idLote,
          nombreLote: nombre,
          descripcion: descripcion,
          tamanio: tamanio/10000,
          estado: 1,
          Fundo_idFundo: fundo,
          campaña: [{
            idCampañaXLote: row.idCampañaXLote,
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
      }, [nombre, descripcion,tamanio, cultivo, variedad, numPlantas, numSurcos, fundo, coordenadas])

    React.useEffect(() => {
      let data = {
        nombre_id: selectedFundo[0].idFundo
      }
      getLotesXFundo(data);
      const found = lotes.filter((e) => e.idLote === row.idLote)
      console.log("COORD", found)
      const flag = typeof found[0] === 'object'
      if (flag) setCoordenadas(found[0].coordenadas)
    }, [])

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
            console.log("LOTES",response)
            
              
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
            {"Modificar lote"}
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
                disabled
                defaultValue={campaña}
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
                disabled
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
            <MapViewPopUp
              fundo={row.idFundo}
              fundos={fundos}
              lotes={lotes}
              selectedFundo={selectedFundo}
              setSelectedFundo={setSelectedFundo}
              row={row}
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

export default PopUpModificarLote