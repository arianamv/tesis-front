import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Divider, FormControl, LinearProgress, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
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
import { listarCampanias, listarCampañaXCultivo } from '../services/adminService';
import PopUpDescargar from './Popups/PopUpDescargar';
import PopUpAñadirCampaña from './Popups/PopUpAñadirCampaña';
import PopUpModificarCampaña from './Popups/PopUpModificarCampaña';
import dayjs from 'dayjs';


export default function TablaCampañas({search, setSearch, rowsTable, setRowsTable, rows, setRows}) {
  const [showEditCustomer, setShowEditCustomer] = React.useState(false);
  const [dataCustomer, setDataCustomer] = React.useState({
    cultivos: [],
    descripcion: "",
    estado: 1,
    fechaFin: dayjs(),
    fechaIni: dayjs(),
    nombre: "",
  });
  const [idClient, setIdClient] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openRestore, setOpenRestore] = React.useState(false);
  const [isEdition, setIsEdition] = React.useState(false);
  const { setProgress } = useProgress()
  const { setAlert } = useAlert()
  const [estadoCliente, setEstadoCliente] = React.useState("ACTIVO");
  const [showEliminar, setShowEliminar] = React.useState(false);
  const [showDescargar, setShowDescargar] = React.useState(false);
  const [showAñadir, setShowAñadir] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const handleChange = (event) => {
    setEstadoCliente(event.target.value);
    //RellenarTabla(event.target.value)
  };

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
        width: 200,
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
        width: 380,
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
      field: 'fechaIni',
      headerName: 'Fecha de inicio',
      headerClassName: 'super-app-theme--header',
      width: 150,
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
                  {formatDate(cellValues.value)}
              </Box>
          )
      }
    },
    {
        field: 'fechaFin',
        headerName: 'Fecha Fin',
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
                    {formatDate(cellValues.value)}
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

  function handleDownload(){
    setShowDescargar(true);
  }

  function handleDelete(id){
    setIdClient(id);
    setShowEliminar(true);
  }

  function handleAñadir(){
    setShowAñadir(true);
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

  const getCampañaXCultivo = () => {
    listarCampañaXCultivo().then((response) => {
      if(response?.data){
        if(response?.data.Campaña){
          let aux = [];
          for(let i = 0; i < response?.data?.Campaña?.length; i++){
            aux.push({
              id: i+1,
              idCampañaXCultivo: response?.data.Campaña[i].idCampañaXCultivo,
              estado: response?.data.Campaña[i].estado,
              idCampaña: response?.data.Campaña[i].Campaña_idCampaña,
              idCultivo: response?.data.Campaña[i].Cultivo_idCultivo,
              fechaIni: response?.data.Campaña[i].fechaIni,
              fechaFin: response?.data.Campaña[i].fechaFin,
              nombre: response?.data.Campaña[i].nombre,
              descripcion: response?.data.Campaña[i].descripcion,
              cultivos: response?.data.Campaña[i].cultivos,
            })
          }
          setRows(aux);
          rows = aux;
          setRowsTable(aux);
          rowsTable = aux;
          console.log(rowsTable)
          setLoading(false);
        }
      }
    })
  }

  React.useEffect(() => {
    getCampañaXCultivo()
  }, [])

  return (
    <div>
      <PopUpAñadirCampaña
        show={showAñadir}
        setShow={setShowAñadir}
      />
      <PopUpModificarCampaña
        show={showEditCustomer}
        setShow={setShowEditCustomer}
        row={dataCustomer}
      />
      <PopUpDescargar
        show={showDescargar}
        setShow={setShowDescargar}
      />
      <PopupEliminar
        show={showEliminar}
        setShow={setShowEliminar}
      />
      <Box display='flex' sx={{ mb: 1 }}>
          <Box>
            <Typography><b>Campañas</b></Typography>
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
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        disableColumnMenu
        slots={{
          loadingOverlay: LinearProgress,
        }}
        loading={loading}
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
  )
}