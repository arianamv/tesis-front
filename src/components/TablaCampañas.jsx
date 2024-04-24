import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Divider, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Download, Restore } from "@mui/icons-material";
import { isOverflown } from '@mui/x-data-grid/utils/domUtils';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import useAlert from './AlertContext/useAlert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import useProgress from './ProgressContext/useProgress'
import PopupEliminar from './Popups/PopupEliminarCampaña';


export default function TablaCampañas({search,setSearch,rowsTable,setRowsTable}) {
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

  const handleChange = (event) => {
    setEstadoCliente(event.target.value);
    //RellenarTabla(event.target.value)
  };

  const rows = ([
    {
        id: 1,
        nombre: '2024-1',
        descripcion: 'Campaña 2024',
        fechaInicio: '01/01/2024',
        fechaFin: '31/12/2024',
        cultivo: 'Palta',
        año: '2024',
        estado: 'Activo',
    },
  ]);

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
                    {cellValues.value}
                </Box>
            )
        }
    },
    {
        field: 'descripcion',
        headerName: 'Descripción',
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
                    {cellValues.value}
                </Box>
            )
        }
    },
    {
        field: 'fechaInicio',
        headerName: 'Fecha Inicio',
        type: 'number',
        width: 100,
        headerClassName: 'super-app-theme--header',
        editable: false,
        headerAlign: 'center',
        align: 'initial',
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
        field: 'fechaFin',
        headerName: 'Fecha Fin',
        headerAlign: 'center',
        width: 100,
        headerClassName: 'super-app-theme--header',
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
        field: 'cultivo',
        headerName: 'Cultivo',
        headerAlign: 'center',
        headerClassName: 'super-app-theme--header',
        width: 100,
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
        field: 'año',
        headerName: 'Año',
        headerAlign: 'center',
        width: 100,
        headerClassName: 'super-app-theme--header',
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
        field: 'estado',
        headerName: 'Estado',
        headerAlign: 'center',
        width: 100,
        align: 'center',
        headerClassName: 'super-app-theme--header',
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
          (key) => key.nombre?.toLowerCase().includes(search.toLowerCase()) ||
          key.descripcion?.toLowerCase().includes(search.toLowerCase())
        ))
    }
  }, [search]);

/*
  const RellenarTabla = (estadoAux = "ACTIVO") => {
    setProgress(true)
    getCustomers()
      .then((response) => {
        //console.log(response?.data)
        if(response?.data){
          let auxrows = [];
          for(let i = 0; i < response?.data.length; i++){
            if (response?.data[i].estado_empresa_cliente === estadoAux){
              auxrows.push({
                id: response?.data[i].id,
                ruc: response?.data[i].ruc,
                razonSocial: response?.data[i].razon_social,
                dirFiscal: response?.data[i].direccion_fiscal,
                estado: response?.data[i].estado_empresa_cliente,
                nombreFac: response?.data[i].contacto_facturacion?.nombres,
                correoFac: response?.data[i].contacto_facturacion?.correo,
                telefonoFac: response?.data[i].contacto_facturacion?.celular,
                nombreCob: response?.data[i].contacto_gest_cobranza?.nombres,
                correoCob: response?.data[i].contacto_gest_cobranza?.correo,
                telefonoCob: response?.data[i].contacto_gest_cobranza?.celular,
                nombreGest: response?.data[i].contacto_gest_colaborador?.nombres,
                correoGest: response?.data[i].contacto_gest_colaborador?.correo,
                telefonoGest: response?.data[i].contacto_gest_colaborador?.celular,
              })
            }
          }
          console.log("RELLENAR TABLA")
          console.log(auxrows)
          setRows(auxrows);
          setRowsTable(auxrows);
        }
        setProgress(false)
        //console.log(rowsTable)
      }).catch((error) => {
        setProgress(false)
        setAlert("Error: "+error, "error")
        //console.log(error)
      })
  }
*/


  return (
    <div>
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
              pageSize: 19,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        disableColumnMenu
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