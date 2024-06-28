import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Divider, FormControl, FormHelperText, LinearProgress, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Download, Restore } from "@mui/icons-material";
import { isOverflown } from '@mui/x-data-grid/utils/domUtils';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { mt } from 'date-fns/locale';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import useAlert from './AlertContext/useAlert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import useProgress from './ProgressContext/useProgress'
import PopupEliminar from './Popups/PopupEliminarCampaña';
import { type } from '@testing-library/user-event/dist/type';
import { format } from 'date-fns';
import { listarEvaluadores, listarFundos, listarLoteXFundo, listarUsuarios, listarUsuariosXFundo } from '../services/adminService';
import PopUpAñadirEvaluador from './Popups/PopUpAñadirEvaluador';
import PopUpModificarEvaluador from './Popups/PopUpModificarEvaluador';
import PopUpDescargar from './Popups/PopUpDescargar';
import PopUpEliminarEvaluador from './Popups/PopUpEliminarEvaluador';

function TablaEvaluadores({search, setSearch, rowsTable, setRowsTable, rows, setRows}) {
    const [showEditCustomer, setShowEditCustomer] = React.useState(false);
    const [dataCustomer, setDataCustomer] = React.useState({
      idUsuario: 0,
      nombre: "",
      apellidoPat: "",
      apellidoMat: "",
      telefono: "",
      dni: "",
      correo: "",
      fundos: []
    });
    const [idClient, setIdClient] = React.useState(0);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [openRestore, setOpenRestore] = React.useState(false);
    const [isEdition, setIsEdition] = React.useState(false);
    const { setProgress } = useProgress()
    const { setAlert } = useAlert()
    const [estadoCliente, setEstadoCliente] = React.useState("ACTIVO");
    const [showEliminar, setShowEliminar] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [showAñadir, setShowAñadir] = React.useState(false);
    const [showDescargar, setShowDescargar] = React.useState(false);
  
    const handleChange = (event) => {
      setEstadoCliente(event.target.value);
      //RellenarTabla(event.target.value)
    };

    function handleAñadir(){
      setShowAñadir(true);
    }

    function handleDownload(){
      setShowDescargar(true);
    }
  
    const columnas = [
      { 
          field: 'id',
          headerClassName: 'super-app-theme--header',
          headerName: 'ID',
          width: 10,
          headerAlign: 'center',
          align: 'center',
          renderCell: (cellValues) => {
              return (
                  <Box
                    sx={{
                      maxHeight: 'inherit',
                      whiteSpace: 'initial',
                      lineHeight: '16px',
                    }}
                  >
                      {cellValues.value}
                  </Box>
              )
          }
      },
      {
          field: 'nombre',
          headerName: 'Nombre', 
          headerClassName: 'super-app-theme--header',
          editable: false,
          width: 350,
          headerAlign: 'center',
          align: 'center',
          renderCell: (cellValues) => {
              return (
                  <Box
                    sx={{
                      maxHeight: 'inherit',
                      whiteSpace: 'initial',
                      lineHeight: '16px',
                    }}
                  >
                      {capitalizeWords(cellValues.value)}
                  </Box>
              )
          }
      },
      {
          field: 'dni',
          headerName: 'DNI',
          editable: false,
          headerClassName: 'super-app-theme--header',
          width: 150,
          headerAlign: 'center',
          renderCell: (cellValues) => {
            //console.log(cellValues.value)
              return (
                  <Box
                    sx={{
                      maxHeight: 'inherit',
                      whiteSpace: 'initial',
                      lineHeight: '16px',
                    }}
                  >
                      {(cellValues.value)}
                  </Box>
              )
          }
      },
      {
        field: 'email',
        headerName: 'Correo electrónico',
        headerClassName: 'super-app-theme--header',
        width: 220,
        headerAlign: 'center',
        align: 'center',
        editable: false,
        renderCell: (cellValues) => {
          //console.log(cellValues.value)
            return (
                <Box
                  sx={{
                    maxHeight: 'inherit',
                    whiteSpace: 'initial',
                    lineHeight: '16px',
                  }}
                >
                    {(cellValues.value)}
                </Box>
            )
        }
      },
      {
          field: 'telefono',
          headerName: 'Teléfono',
          headerAlign: 'center',
          width: 150,
          headerClassName: 'super-app-theme--header',
          align: 'center',
          renderCell: (cellValues) => {
            //console.log(cellValues.value)
              return (
                  <Box
                    sx={{
                      maxHeight: 'inherit',
                      whiteSpace: 'initial',
                      lineHeight: '16px',
                    }}
                  >
                      {capitalizeWords(cellValues.value)}
                  </Box>
              )
          }
      },
      {
          field: 'estado',
          headerName: 'Estado',
          headerAlign: 'center',
          width: 100,
          align: 'center',
          headerClassName: 'super-app-theme--header',
          renderCell: (cellValues) => {
            return (cellValues.value === 1) ? (
                  <Box
                    sx={{
                      maxHeight: 'inherit',
                      whiteSpace: 'initial',
                      lineHeight: '16px',
                    }}
                  >
                      {'Activo'}
                  </Box>
              ):(
                <Box
                    sx={{
                      maxHeight: 'inherit',
                      whiteSpace: 'initial',
                      lineHeight: '16px',
                    }}
                  >
                      {'Inactivo'}
                </Box>
              )
          }
      },
      {
          field: 'opciones',
          headerName: 'Opciones',
          sortable: false,
          headerClassName: 'super-app-theme--header',
          headerAlign: 'center',
          align: 'center',
          width: 100,
          renderCell: (cellValues) => {
                return (
                  <div>
                      <IconButton onClick={ () => handleEdit(cellValues.id, cellValues)}>
                          <EditIcon style={{ color: "#074F57" }}/>
                      </IconButton>
                      
                      <IconButton onClick = {() => handleDelete(cellValues.id, cellValues)}>
                          <DeleteIcon style={{ color: 'red' }}/>
                      </IconButton>
                  </div>
                );
          }
      },
    ];
  
    function padWithLeadingZeros(num, totalLength) {
      return String(num).padStart(totalLength, '0');
    }
  
    const formatDate = (value) => {
      let date = new Date(value)
      console.log(value)
      if(value != null)
      return padWithLeadingZeros(date.getUTCDate(), 2) + '/' + padWithLeadingZeros(parseInt(date.getUTCMonth() + 1), 2) + '/' + date.getUTCFullYear();    
    }
  
    function handleEdit(id, datos){
      setIdClient(id);
      setIsEdition(true);
      setDataCustomer(datos.row);
      setShowEditCustomer(true)
    }
  
    const capitalizeWords = (str) => {
      if(str != null || str != undefined)
      return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
  
    function handleDelete(id, datos){
      setIdClient(id);
      setDataCustomer(datos.row);
      setShowEliminar(true);
    }
  
    function handleRestore(id){
      setIdClient(id);
      setOpenRestore(true); 
    }
  
    React.useEffect(() => {
      if (search === "") {
        setRowsTable(rows)
      }
      if (search != "") {
        setRowsTable(rows.filter(
            (key) => key.nombre?.toLowerCase().includes(search?.toLowerCase()) ||
            key.descripcion?.toLowerCase().includes(search?.toLowerCase())
          ))
      }
    }, [search]);
  
    let [fundos, setFundos] = React.useState(-1);
    const getFundos = () => {
      listarFundos().then((response) => {
        setFundos(response.data?.Fundo)
        fundos = response.data?.Fundo
      })
    }

    let [lotesFundo, setLotesFundo] = React.useState(-1);
    const getLotes = (id) => {
      listarLoteXFundo(id).then((response) => {
        setLotesFundo(response.data?.Lote)
        lotesFundo = response.data?.Lote
      })
    }

    const getUsuarios = () => {
        getFundos();
        let id = {
          nombre_id: 1,
        }
        getLotes(id);
        listarUsuariosXFundo().then((response) => {
          if(response?.data){
              if(response?.data.Usuario){
                let aux = [];
                for(let i = 0; i < response?.data?.Usuario?.length; i++){
                    aux.push({
                    id: i+1,
                    idUsuario: response?.data.Usuario[i].idUsuario,
                    nombre: response?.data.Usuario[i].nombres + " " + response?.data.Usuario[i].apellidoPat + " " + response?.data.Usuario[i].apellidoMat,
                    nombres: response?.data.Usuario[i].nombres,
                    apellidoPat: response?.data.Usuario[i].apellidoPat,
                    apellidoMat: response?.data.Usuario[i].apellidoMat,
                    dni: response?.data.Usuario[i].dni,
                    email: response?.data.Usuario[i].email,
                    telefono: response?.data.Usuario[i].telefono,
                    contrasenia: response?.data.Usuario[i].contrasenia,
                    estado: response?.data.Usuario[i].estado,
                    idPerfil: response?.data.Usuario[i].Perfil_idPerfil,
                    fundos: response?.data.Usuario[i].fundos,
                  })
                }
                setRows(aux);
                rows = aux;
                setRowsTable(aux);
                rowsTable = aux;
                console.log(response?.data);
                setLoading(false);
              }
            }
          })
    }
  
    React.useEffect(() => {
      getUsuarios()
    }, [])

    React.useEffect(() => {
      if(showAñadir === false){
        getUsuarios()
      }
      if(showEditCustomer === false) getUsuarios()
      if(showEliminar === false) getUsuarios()
  }, [showAñadir, showEditCustomer, showEliminar])
  
    return (
      <div>
        <PopUpAñadirEvaluador
          show={showAñadir}
          setShow={setShowAñadir}
          fundos={fundos}
          lotesFundo={lotesFundo}
          setLotesFundo={setLotesFundo}
        />
        <PopUpModificarEvaluador
          show={showEditCustomer}
          setShow={setShowEditCustomer}
          row={dataCustomer}
          fundos={fundos}
        />
        <PopUpEliminarEvaluador
          show={showEliminar}
          setShow={setShowEliminar}
          row={dataCustomer}
        />
        <PopUpDescargar
          show={showDescargar}
          setShow={setShowDescargar}
        />
        <Box display='flex' sx={{ mb: 1 }}>
            <Box>
              <Typography><b>Evaluadores</b></Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end" sx={{ width: '100%',}}>
              <Button
                variant='contained'
                size='small'
                startIcon={<AddIcon />}
                sx={{
                    ml: 1,
                    backgroundColor: '#074F57',
                    position: 'relative'
                  }}
                onClick = {() => handleAñadir()}
              >
                Añadir
              </Button>
              <Button
                variant='contained'
                size='small'
                startIcon={<FileDownloadIcon />}
                sx={{
                  ml: 1,
                  backgroundColor: '#074F57',
                  position: 'relative'
                }}
                onClick={() => handleDownload()}
              >
                Descargar
              </Button>
            </Box>
            </Box>
        <Box sx={{ display: "flex" }}>
        <DataGrid
          rows={rowsTable}
          columns={columnas}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          slots={{
            loadingOverlay: LinearProgress,
          }}
          loading={loading}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          disableColumnMenu
          getRowId={(row) => row.id} 
          disableColumnResize
          sx={{
              height: '100%', width: '100%',
              '& .MuiDataGrid-columnHeaderTitle': {
                  textOverflow: "clip",
                  whiteSpace: "break-spaces",
                  lineHeight: 1,
              },
              "& .MuiDataGrid-renderingZone": {
                maxHeight: "none !important"
              },
              "& .MuiDataGrid-cell": {
                lineHeight: "unset !important",
                maxHeight: "none !important",
                whiteSpace: "normal",
                isOverflown: "auto",
                lineHeightStep: "16px !important",
                alignItems: "center",
                paddingTop: "10px !important",
                paddingBottom: "10px !important",
              },
              "& .MuiDataGrid-row": {
                maxHeight: "none !important"
              },
              '& .super-app-theme--header': {
                backgroundColor: '#74A57F',
                color: '#FFFFFF'
              },
          }}
        />
        </Box>
      </div>
    );
}

export default TablaEvaluadores