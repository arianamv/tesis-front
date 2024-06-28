import React from 'react'
import NavBarAdmin from '../../components/Navbars/NavbarAdmin'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Row from 'react-bootstrap/Row';
import SearchIcon from "@mui/icons-material/Search";
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
    Select,
    MenuItem,
  } from "@mui/material";
import ColumnTabsMov from '../../components/Tabs/columnTabsMov';
import FilterEvaluaciones from '../../components/Filters/FilterEvaluaciones';
import { listarSemanas } from '../../services/adminService';
import FilterAplicaciones from '../../components/Filters/FilterAplicaciones';
import ColumnTabsEva from '../../components/Tabs/columnTabsEva';
import NavbarEvaluador from '../../components/Navbars/NavbarEvaluador';

function SearchBar({search, setSearch}) {
  const onSearch = (event) => {
    setSearch(event.target.value);
  };
  return (
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
  )
}

function CombSemanas({semana, setSemana, semanas, setSemanas}) {
  const handleSelect = (event) => {
    setSemana(event.target.value);
  }
  return(
    <Select
      id="vista-select"
      value={semana}
      onChange={handleSelect}
      size={'small'}
      variant='outlined'
      sx={{ 
          width: '100%'
      }}
      >
      {semanas?.map((e) => (
        <MenuItem key={e.idSemana} value={e.semana}>
          {e.semana}
        </MenuItem>
      ))}
    </Select>
  )
}

function GestionEvaluador() {
    const [numTab, setNumTab] = React.useState('1');
    const [rowsTable, setRowsTable] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [vista, setVista] = React.useState(0);
    const [semana, setSemana] = React.useState(1);
    let [semanas, setSemanas] = React.useState([]);
    const [filterEvaluaciones, setFilterEvaluaciones] = React.useState(null);
    let [rowsTableEvaluaciones, setRowsTableEvaluaciones] = React.useState(-1);
    let [rowsEvaluaciones, setRowsEvaluaciones] = React.useState(-1);
    const [filterAplicaciones, setFilterAplicaciones] = React.useState(null);
  
    const onSearch = (event) => {
      setSearch(event.target.value);
    };
  
    const openFilter = (event) => {
      switch (numTab){
        case '1':
          setFilterEvaluaciones(event.currentTarget);
          return;
        case '2':
          setFilterAplicaciones(event.currentTarget);
          return;
      }
    };
  
    const getSemanas = () => {
      listarSemanas().then((response) => {
        setSemanas(response.data?.Evaluacion)
        semanas = response.data?.Evaluacion
      })
    }
  
    React.useEffect(() => {
      getSemanas();
    }, [])
  
    return (
      <div>
        <FilterEvaluaciones
          show={filterEvaluaciones}
          setShow={setFilterEvaluaciones}
          rowsTable={rowsTableEvaluaciones}
          setRowsTable={setRowsTableEvaluaciones}
          rows={rowsEvaluaciones}
          setRows={setRowsEvaluaciones}
        />
        <Box sx={{ display: 'flex' }}>
          <NavbarEvaluador/>
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
              Gestión de movimientos
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
                  {vista ? (
                    <Box sx={{
                      mt: 1,
                      ml: 3,
                      width: '90vw',
                      border: 1,
                      borderColor: '#D3D3D3',
                      justifyContent: 'center',
                      display: 'flex'
                  }}>
                      <Box sx={{ width: '100%', p: 2 }}>
                      <CombSemanas
                      semana={semana}
                      setSemana={setSemana}
                      semanas={semanas}
                      setSemanas={setSemanas}
                      />
                    </Box>
                    </Box>
                  ) : (
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
                    <SearchBar
                      search={search}
                      setSearch={search}
                    />
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center' sx={{ width: '5%' }}>
                    <IconButton onClick={openFilter}>
                      <FilterAltIcon style={{ color: "#074F57" }}/>
                    </IconButton>
                    </Box>
                    </Box>
                  )}
            <ColumnTabsEva
            value={numTab}
            setValue={setNumTab}
            search={search}
            setSearch={setSearch}
            rowsTableEvaluaciones={rowsTableEvaluaciones}
            setRowsTableEvaluaciones={setRowsTableEvaluaciones}
            rowsEvaluaciones={rowsEvaluaciones}
            setRowsEvaluaciones={setRowsEvaluaciones}
            semana={semana}
            setSemana={setSemana}
            vista={vista}
            setVista={setVista}
            />
        </Row>
      </Box>
      </div>
    )
}

export default GestionEvaluador