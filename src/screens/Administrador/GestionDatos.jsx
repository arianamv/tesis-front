import React, {useState} from 'react'
import NavBarAdmin from '../../components/Navbars/NavbarAdmin'
import Typography from '@mui/material/Typography';
import ColumnTabs from '../../components/Tabs/columnTabs';
import Row from 'react-bootstrap/Row';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from '@mui/icons-material/AccountCircle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
    Divider,
    Grid,
    InputAdornment,
    Paper,
    TextField,
    Button,
    Container,
    Stack,
    IconButton,
  } from "@mui/material";
import FilterCampañas from '../../components/Filters/FilterCampañas';
import { listarCampanias, listarCampañaXCultivo } from '../../services/adminService';

function GestionDatos() {
  const [numTab, setNumTab] = React.useState('1');
  let [rowsTable, setRowsTable] = React.useState([]);
  let [rowsCamp, setRowsCamp] = React.useState(-1);
  let [rowsLote, setRowsLote] = React.useState([]);
  let [rowsPlaga, setRowsPlaga] = React.useState([]);
  const [rowsPest, setrowsPest] = React.useState([]);
  const [rowsEvaluador, setRowsEvaluador] = React.useState([]);
  const [rowsDescargar, setRowsDescargar] = React.useState(rowsTable);
  const [search, setSearch] = React.useState("");
  const [titulo, setTitulo] = React.useState("");
  const [archivo, setArchivo] = React.useState("base_datos.csv");
  const [flagButton, setFlagButton] = React.useState(0);
  const [showGestCustomer, setShowGestCustomer] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [searchLabel, setSearchLabel] = React.useState("Buscar por palabra clave");
  const [filterOpen, setFilterOpen] = React.useState(null);
  let [campanias, setCampanias] = React.useState(-1);
  let [rows, setRows] = React.useState(-1);

  const onSearch = (event) => {
    setSearch(event.target.value);
  };

  const openFilter = (event) => {
    setFilterOpen(event.currentTarget);
  };

  return (
    <div>
      <FilterCampañas
        show={filterOpen}
        setShow={setFilterOpen}
      />
      <Box sx={{ display: 'flex'}}>
      <NavBarAdmin/>
        <Row>
        <Box display='flex'>
          <Box display='flex' sx={{ width: '90%' }}>
          <Typography variant='h6' 
            sx={{ 
              pt: 3, 
              pl: 3, 
              fontWeight: 'medium',
              color: '#103A5E'
            }}>
            Gestión de datos
          </Typography>
          </Box>
          <Box display='flex' justifyContent='flex-end' sx={{ width: '10%' }}>
          <IconButton
            size="large"
            edge="end"
          >
            <AccountCircle />
          </IconButton>
          </Box>
        </Box>
        <Box sx={{
            mt: 1,
            ml: 3,
            width: '90vw',
            border: 1,
            borderColor: '#D3D3D3',
            justifyContent: 'center',
            display: 'flex'
        }}>

            <Box sx={{ width: '95%', pb:2, pl: 2, pt: 2 }}>
              <TextField
                value={search}
                onChange={onSearch}
                fullWidth={true}
                variant="standard"
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon style={{ color: "#074F57" }}/>
                    </InputAdornment>
                    ),
                }}
              />
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' sx={{ width: '5%' }}>
              <IconButton onClick={openFilter}>
                <FilterAltIcon style={{ color: "#074F57" }}/>
              </IconButton>
            </Box>
          </Box>

        <ColumnTabs
          value={numTab}
          setValue={setNumTab}
          search={search}
          setSearch={setSearch}
        />
        </Row>
        
      </Box>
    </div>
  )
}

export default GestionDatos