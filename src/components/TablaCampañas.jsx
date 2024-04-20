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
import useAlert from './AlertContext/useAlert';
import useProgress from './ProgressContext/useProgress'


export const CLIENTE_COLUMNS = {
  id: true,
  ruc: true,
  razonSocial: true,
  dirFiscal: true,
  estado: true,
  nombreFac: false,
  correoFac: false,
  telefonoFac: false,
  nombreGest: false,
  correoGest: false,
  telefonoGest: false,
  nombreCob: false,
  correoCob: false,
  telefonoCob: false,
};

export const FACTURACION_COLUMNS = {
    id: true,
    ruc: true,
    razonSocial: true,
    dirFiscal: false,
    estado: false,
    nombreFac: true,
    correoFac: true,
    telefonoFac: true,
    nombreGest: false,
    correoGest: false,
    telefonoGest: false,
    nombreCob: false,
    correoCob: false,
    telefonoCob: false,
  };

  export const GESTIONES_COLUMNS = {
    id: true,
    ruc: true,
    razonSocial: true,
    dirFiscal: false,
    estado: false,
    nombreFac: false,
    correoFac: false,
    telefonoFac: false,
    nombreGest: true,
    correoGest: true,
    telefonoGest: true,
    nombreCob: false,
    correoCob: false,
    telefonoCob: false,
  };

  export const COBRANZA_COLUMNS = {
    id: true,
    ruc: true,
    razonSocial: true,
    dirFiscal: false,
    estado: false,
    nombreFac: false,
    correoFac: false,
    telefonoFac: false,
    nombreGest: false,
    correoGest: false,
    telefonoGest: false,
    nombreCob: true,
    correoCob: true,
    telefonoCob: true,
  };


export default function TablaCampañas({search,setSearch,rowsTable,setRowsTable}) {
  const [columnVisible, setColumnVisible] = React.useState(CLIENTE_COLUMNS);
  const [showEditCustomer, setShowEditCustomer] = React.useState(false);
  const [dataCustomer, setDataCustomer] = React.useState("");
  const [idClient, setIdClient] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openRestore, setOpenRestore] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [isEdition, setIsEdition] = React.useState(false);
  const { setProgress } = useProgress()
  const { setAlert } = useAlert()
  const [estadoCliente, setEstadoCliente] = React.useState("ACTIVO");

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
        field: 'descripción',
        headerName: 'Descripción',
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
        renderCell: (cellValues) => {
            if (cellValues.row.estado === "ACTIVO"){
              return (
                <div>
                    <IconButton onClick={ () => handleEdit(cellValues.id, cellValues)}>
                        <EditIcon color="primary"/>
                    </IconButton>
                    
                    <IconButton onClick = {() => handleDelete(cellValues.id)}>
                        <DeleteIcon style={{ color: 'red' }}/>
                    </IconButton>
                </div>
              );
            } else {
              return (
                <div>                    
                    <IconButton onClick = {() => handleRestore(cellValues.id)}>
                        <Restore style={{ color: 'green' }}/>
                    </IconButton>
                </div>
              );
            }
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
    setOpenAlert(true); 
  }

  function handleRestore(id){
    setIdClient(id);
    setOpenRestore(true); 
  }
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

  React.useEffect(() => {
    if (search === "") {
      setRowsTable(rows)
    }
    if (search != "") {
      setRowsTable(rows.filter(
          (key) => (key.razonSocial?.toLowerCase().includes(search.toLowerCase()) ||
          key.ruc?.toString().includes(search))
        ))
    }
    //console.log("RESULTADO", rowsTable)
  }, [search]);


  return (
    <div>
      <Box sx={{ height: 500, width: '100vh' }}>
      <DataGrid
        rows={rowsTable}
        columns={columnas}
        columnVisibilityModel={columnVisible}
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
        sx={{
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
              backgroundColor: '#Efefef',
            },
        }}
      />
      </Box>
    </div>
  );
}