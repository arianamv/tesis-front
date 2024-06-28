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
import { listarCampanias, listarCultivos, listarFundos, listarLoteXCampaña, listarLotes, listarLotesXCampañaXFundo, listarVariedadesXCultivo } from '../services/adminService';
import PopUpAñadirLote from './Popups/PopUpAñadirLote';
import PopUpDescargar from './Popups/PopUpDescargar';
import PopUpModificarLote from './Popups/PopUpModificarLote';

function TablaLotes({search, setSearch, rowsTable, setRowsTable, rows, setRows, campaña, setCampaña}) {
  const [showEditCustomer, setShowEditCustomer] = React.useState(false);
  const [dataCustomer, setDataCustomer] = React.useState("");
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
        field: 'nombreLote',
        headerName: 'Nombre', 
        headerClassName: 'super-app-theme--header',
        editable: false,
        width: 100,
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
                    {capitalizeWords(cellValues.value)}
                </Box>
            )
        }
    },
    {
      field: 'area',
      headerName: 'Área',
      headerClassName: 'super-app-theme--header',
      width: 100,
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
      field: 'nombreFundo',
      headerName: 'Fundo',
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
                  {capitalizeWords(cellValues.value)}
              </Box>
          )
      }
    },
    {
      field: 'nombreCultivo',
      headerName: 'Cultivo',
      headerClassName: 'super-app-theme--header',
      width: 100,
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
                  {capitalizeWords(cellValues.value)}
              </Box>
          )
      }
    },
    {
      field: 'nombreVariedad',
      headerName: 'Variedad',
      headerClassName: 'super-app-theme--header',
      width: 100,
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
                  {capitalizeWords(cellValues.value)}
              </Box>
          )
      }
    },
    {
      field: 'numPlantas',
      headerName: 'N° Plantas',
      headerClassName: 'super-app-theme--header',
      width: 100,
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
      field: 'numSurcos',
      headerName: 'N° Surcos',
      headerClassName: 'super-app-theme--header',
      width: 100,
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

  let [variedades, setVariedades] = React.useState([]);
  const getVariedades = (id) => {
    listarVariedadesXCultivo(id).then((response) => {
      setVariedades(response.data?.Cultivo)
      variedades = response.data?.Cultivo
    })
  }

  let [cultivos, setCultivos] = React.useState([]);
  const getCultivos = () => {
    listarCultivos().then((response) => {
      setCultivos(response.data?.Cultivo)
      cultivos = response.data?.Cultivo
    })
  }

  let [campañas, setCampañas] = React.useState([]);
  const getCampañas = () => {
    listarCampanias().then((response) => {
      setCampañas(response.data?.Campaña)
      campañas = response.data?.Campaña
    })
  }

  let [fundos, setFundos] = React.useState([]);
  const getFundos = () => {
    listarFundos().then((response) => {
      setFundos(response.data?.Fundo)
      fundos = response.data?.Fundo
    })
  }

  const getLotesXCampaña = (data) => {
    getCampañas();
    getCultivos();
    getFundos();
    let id = {
      nombre_id: 1
    }
    getVariedades(id);
    setLoading(true);
    listarLoteXCampaña(data).then((response) => {
        if(response?.data){
            if(response?.data.Lote){
              let auxLotes = [];
              for(let i = 0; i < response?.data?.Lote?.length; i++){
                auxLotes.push({
                  id: i+1,
                  idCampañaXLote: response?.data.Lote[i].idCampañaXLote,
                  idLote: response?.data.Lote[i].Lote_idLote,
                  estado: response?.data.Lote[i].estado,
                  idFundo: response?.data.Lote[i].Lote_Fundo_idFundo,
                  numPlantas: response?.data.Lote[i].numPlantas,
                  numSurcos: response?.data.Lote[i].numSurcos,
                  idVariedad: response?.data.Lote[i].Variedad_idVariedad,
                  idCultivo: response?.data.Lote[i].Variedad_Cultivo_idCultivo,
                  idCampaña: response?.data.Lote[i].Campaña_idCampaña,
                  nombreCampaña: response?.data.Lote[i].nombreCampaña,
                  nombreFundo: response?.data.Lote[i].nombreFundo,
                  descripcion: response?.data.Lote[i].descripcion,
                  idLote: response?.data.Lote[i].idLote,
                  nombreLote: response?.data.Lote[i].nombreLote,
                  area: response?.data.Lote[i].tamanio,
                  nombreCultivo: response?.data.Lote[i].nombreCultivo,
                  nombreVariedad: response?.data.Lote[i].nombreVariedad,
                  coordenadas: response?.data.Lote[i].coordenadas,
                })
              }
              setRows(auxLotes);
              rows = auxLotes;
              setRowsTable(auxLotes);
              rowsTable = auxLotes;
              setLoading(false);
            }
          }
        })
  }

  React.useEffect(() => {
    let data = {
      nombre_id: campaña
    }
    if(showAñadir === false){
      getLotesXCampaña(data)
    }
    if(showEditCustomer === false) getLotesXCampaña(data)
    if(showEliminar === false) getLotesXCampaña(data)
}, [showAñadir, showEditCustomer, showEliminar])

  React.useEffect(() => {
    let data = {
      nombre_id: campaña
    }
    getLotesXCampaña(data)
  }, [])

  React.useEffect(() => {
    let data = {
      nombre_id: campaña
    }
    getLotesXCampaña(data)
  }, [campaña])

  return (
    <div>
      <PopUpAñadirLote
        show={showAñadir}
        setShow={setShowAñadir}
        cultivos={cultivos}
        campañas={campañas}
        variedades={variedades}
        setVariedades={setVariedades}
        fundos={fundos}
      />
      <PopUpModificarLote
        show={showEditCustomer}
        setShow={setShowEditCustomer}
        row={dataCustomer}
        cultivos={cultivos}
        campañas={campañas}
        variedades={variedades}
        setVariedades={setVariedades}
        fundos={fundos}
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
            <Typography><b>Lotes</b></Typography>
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
  )
}

export default TablaLotes