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
import { listarAplicaciones, listarEvaluaciones, listarEvaluadores, listarUsuarios } from '../services/adminService';
import PopUpAñadirEvaluacion from './Popups/PopUpAñadirEvaluacion';
import PopUpDescargar from './Popups/PopUpDescargar';
import PopUpAñadirAplicacion from './Popups/PopUpAñadirAplicacion';

function TablaAplicaciones({search, setSearch, rowsTable, setRowsTable, rows, setRows}) {
    const [showEditCustomer, setShowEditCustomer] = React.useState(false);
    const [dataCustomer, setDataCustomer] = React.useState("");
    const [idClient, setIdClient] = React.useState(0);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [openRestore, setOpenRestore] = React.useState(false);
    const [isEdition, setIsEdition] = React.useState(false);
    const { setProgress } = useProgress()
    const { setAlert } = useAlert()
    const [estadoCliente, setEstadoCliente] = React.useState("ACTIVO");
    const [showAñadir, setShowAñadir] = React.useState(false);
    const [showEliminar, setShowEliminar] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [showDescargar, setShowDescargar] = React.useState(false);
  
    const handleChange = (event) => {
      setEstadoCliente(event.target.value);
      //RellenarTabla(event.target.value)
    };

    function handleDownload(){
      setShowDescargar(true);
    }

    function handleAñadir(){
      setShowAñadir(true);
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
        field: 'nombrePesticida',
        headerName: 'Pesticida',
        editable: false,
        headerClassName: 'super-app-theme--header',
        width: 200,
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
                    {capitalizeWords(cellValues.value)}
                </Box>
            )
        }
    },
      {
          field: 'fecha',
          headerName: 'Fecha',
          editable: false,
          headerClassName: 'super-app-theme--header',
          width: 100,
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
                      {formatDate(cellValues.value)}
                  </Box>
              )
          }
      },
      {
        field: 'semana',
        headerName: 'Semana',
        editable: false,
        headerClassName: 'super-app-theme--header',
        width: 80,
        headerAlign: 'center',
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
                    {(cellValues.value)}
                </Box>
            )
        }
    },
      {
        field: 'cantidadAplicada',
        headerName: 'Cantidad',
        headerClassName: 'super-app-theme--header',
        width: 80,
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
          field: 'unidadAplicada',
          headerName: 'Unidad',
          headerAlign: 'center',
          width: 120,
          headerClassName: 'super-app-theme--header',
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
        field: 'nombreCampaña',
        headerName: 'Campaña',
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
                    {(cellValues.value)}
                </Box>
            )
        }
    },
    {
      field: 'nombreLote',
      headerName: 'Lote',
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
                  {(cellValues.value)}
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
                      
                      <IconButton onClick = {() => handleDelete(cellValues.id)}>
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
  
    function handleDelete(id){
      setIdClient(id);
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
  
    const getAplicaciones = () => {
        listarAplicaciones().then((response) => {
          if(response?.data){
              if(response?.data.Aplicacion){
                let aux = [];
                for(let i = 0; i < response?.data?.Aplicacion?.length; i++){
                    aux.push({
                    id: i+1,
                    idADP: response?.data.Aplicacion[i].idADP,
                    area: response?.data.Aplicacion[i].area,
                    fecha: response?.data.Aplicacion[i].fecha,
                    cantidadAplicada: response?.data.Aplicacion[i].cantidadAplicada,
                    unidadAplicada: response?.data.Aplicacion[i].unidadAplicada,
                    semana: response?.data.Aplicacion[i].semana,
                    idCampañaXLote: response?.data.Aplicacion[i].CampañaXLote_idCampañaXLote,
                    idPesticida: response?.data.Aplicacion[i].Pesticida_idPesticida,
                    idCampaña: response?.data.Aplicacion[i].idCampaña,
                    nombreCampaña: response?.data.Aplicacion[i].nombre,
                    nombrePesticida: response?.data.Aplicacion[i].nombrePesticida,
                    idLote: response?.data.Aplicacion[i].idLote,
                    nombreLote: response?.data.Aplicacion[i].nombreLote,
                    estado: response?.data.Aplicacion[i].estado,
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
        getAplicaciones()
        console.log("Aplicaciones", rows)
    }, [])
  
    return (
      <div>
        <PopUpAñadirAplicacion
          show={showAñadir}
          setShow={setShowAñadir}
        />
        <PopupEliminar
          show={showEliminar}
          setShow={setShowEliminar}
        />
        <PopUpDescargar
          show={showDescargar}
          setShow={setShowDescargar}
        />
        <Box display='flex' sx={{ mb: 1 }}>
            <Box>
              <Typography sx={{width: 300}}><b>Aplicaciones de pesticida</b></Typography>
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

export default TablaAplicaciones