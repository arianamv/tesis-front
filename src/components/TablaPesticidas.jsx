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
import { listarEvaluadores, listarPesticidaXPlaga, listarPesticidas, listarPlagas, listarUsuarios } from '../services/adminService';
import PopUpAñadirPesticida from './Popups/PopUpAñadirPesticida';
import PopUpModificarPesticida from './Popups/PopUpModificarPesticida';
import PopUpDescargar from './Popups/PopUpDescargar';
import PopUpEliminarPesticida from './Popups/PopUpEliminarPesticida';

function TablaPesticidas({search, setSearch, rowsTable, setRowsTable, rows, setRows}) {
    const [showEditCustomer, setShowEditCustomer] = React.useState(false);
    const [dataCustomer, setDataCustomer] = React.useState({
      id: 0,
      idPesticida: 0,
      nombre: "",
      descripcion: "",
      material: "",
      recomendaciones: "",
      metodoAplicacion: "",
      toxicidad: 0,
      estado: 1,
      plagas: [],
    });
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
          width: 150,
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
          field: 'descripcion',
          headerName: 'Descripción',
          editable: false,
          headerClassName: 'super-app-theme--header',
          width: 350,
          headerAlign: 'center',
          align: 'left',
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
        field: 'material',
        headerName: 'Material',
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
                    {(cellValues.value)}
                </Box>
            )
        }
    },
      {
        field: 'metodoAplicacion',
        headerName: 'Método de aplicación',
        headerAlign: 'center',
        width: 100,
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
        field: 'toxicidad',
        headerName: 'Toxicidad',
        headerAlign: 'center',
        width: 100,
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
  
    const getPesticidas = () => {
        listarPesticidaXPlaga().then((response) => {
          if(response?.data){
              if(response?.data.Pesticida){
                let aux = [];
                for(let i = 0; i < response?.data?.Pesticida?.length; i++){
                    aux.push({
                    id: i+1,
                    idPesticida: response?.data.Pesticida[i].idPesticida,
                    nombre: response?.data.Pesticida[i].nombrePeticida,
                    descripcion: response?.data.Pesticida[i].descripcion,
                    material: response?.data.Pesticida[i].material,
                    recomendaciones: response?.data.Pesticida[i].recomendaciones,
                    metodoAplicacion: response?.data.Pesticida[i].metodoAplicacion,
                    toxicidad: response?.data.Pesticida[i].toxicidad,
                    estado: response?.data.Pesticida[i].estado,
                    plagas: response?.data.Pesticida[i].plagas,
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
      getPesticidas()
      console.log(rows);
    }, [])

    React.useEffect(() => {
      if(showAñadir === false){
        getPesticidas()
      }
      if(showEditCustomer === false) getPesticidas()
      if(showEliminar === false) getPesticidas()
  }, [showAñadir, showEditCustomer, showEliminar])
  
    return (
      <div>
        <PopUpAñadirPesticida
          show={showAñadir}
          setShow={setShowAñadir}
        />
        <PopUpModificarPesticida
          show={showEditCustomer}
          setShow={setShowEditCustomer}
          row={dataCustomer}
        />
        <PopUpEliminarPesticida
          show={showEliminar}
          setShow={setShowEliminar}
          row={dataCustomer}
        />
        <PopUpDescargar
          show={showDescargar}
          setShow={setShowDescargar}
          rowsTable={rowsTable}
        />
        <Box display='flex' sx={{ mb: 1 }}>
            <Box>
              <Typography><b>Pesticidas</b></Typography>
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

export default TablaPesticidas