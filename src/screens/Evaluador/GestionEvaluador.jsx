import React, { useState } from 'react'
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
import { listarCampanias, listarFundos, listarSemanas } from '../../services/adminService';
import FilterAplicaciones from '../../components/Filters/FilterAplicaciones';
import NavbarEvaluador from '../../components/Navbars/NavbarEvaluador';
import ColumnTabsEva from '../../components/Tabs/columnTabsEva';
import { useLocation } from 'react-router-dom';

function SearchBar({search, setSearch, campañas, setCampañas, campaña, setCampaña}) {
  const onSearch = (event) => {
    setSearch(event.target.value);
  };
  
  const handleSelect = (event) => {
    setCampaña(event.target.value);
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between'  }}>
      <Box sx={{ display: 'flex', width: '65%', alignItems: 'center' }}>
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
    <Box sx={{display: 'flex', width: '30%', alignItems: 'center'}}>
    <Typography>Campaña: </Typography>
    <Select
      id="vista-select"
      value={campaña}
      onChange={handleSelect}
      size={'small'}
      variant='outlined'
      sx={{ 
          width: '100%',
          ml: 2,
      }}
      >
      {campañas?.map((e) => (
        <MenuItem key={e.idCampaña} value={e.idCampaña}>
          {e.nombre}
        </MenuItem>
      ))}
    </Select>
    </Box>
    </Box>
  )
}

function CombSemanas({fundo, setFundo, campaña, setCampaña, semana, setSemana, semanas, setSemanas, fundos, campañas}) {
  const handleSelect = (event) => {
    setSemana(event.target.value);
  }
  const handleFundo = (event) => {
    setFundo(event.target.value);
  }
  const handleCampaña = (event) => {
    setCampaña(event.target.value);
  }
  return(
    <Box display={'flex'} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Box display={'flex'} sx={{ alignItems: 'center', justifyContent: 'space-between', width: '30%' }}>
      <Typography>Fundo: </Typography>
      <Select
      id="vista-select"
      value={fundo}
      onChange={handleFundo}
      size={'small'}
      variant='outlined'
      sx={{ 
          width: '100%',
          ml: 2
      }}
      >
      {fundos?.map((e) => (
        <MenuItem key={e.idFundo} value={e.idFundo}>
          {e.nombreFundo}
        </MenuItem>
      ))}
    </Select>
      </Box>
    <Box display={'flex'} sx={{ alignItems: 'center', justifyContent: 'space-between', width: '30%' }}>
    <Typography>Campaña: </Typography>
      <Select
      id="vista-select"
      value={campaña}
      onChange={handleCampaña}
      size={'small'}
      variant='outlined'
      sx={{ 
          width: '100%',
          ml: 2
      }}
      >
      {campañas?.map((e) => (
        <MenuItem key={e.idCampaña} value={e.idCampaña}>
          {e.nombre}
        </MenuItem>
      ))}
    </Select>
    </Box >
      <Box display={'flex'} sx={{ alignItems: 'center', justifyContent: 'space-between', width: '30%' }}>
      <Typography>Semana: </Typography>
      <Select
      id="vista-select"
      value={semana}
      onChange={handleSelect}
      size={'small'}
      variant='outlined'
      sx={{ 
          width: '100%',
          ml:2
      }}
      >
      {semanas?.map((e) => (
        <MenuItem key={e.idSemana} value={e.semana}>
          {e.semana}
        </MenuItem>
      ))}
    </Select>
      </Box>
    </Box>
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
  let [rowsTableAplicaciones, setRowsTableAplicaciones] = React.useState(-1);
  let [rowsAplicaciones, setRowsAplicaciones] = React.useState(-1);
  const location = useLocation();
  const { state } = location;

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

  let [fundos, setFundos] = React.useState([]);
  const getFundos = () => {
    listarFundos().then((response) => {
      setFundos(response.data?.Fundo)
      fundos = response.data?.Fundo
    })
  }

  const [campaña, setCampaña] = useState(4);
  const [campañaGrafico, setCampañaGrafico] = useState(4);
  const [fundo, setFundo] = useState(2);

  let [campañas, setCampañas] = React.useState([]);
  let [selectedCampaña, setSelectedCampaña] = React.useState([]);
  const getCampañas = () => {
    listarCampanias().then((response) => {
      setCampañas(response.data?.Campaña)
      campañas = response.data?.Campaña
      const found = campañas.find(({ idCampaña }) => idCampaña === campaña);
      console.log("FOUND", found)
      setSelectedCampaña(found)
      selectedCampaña = found
    })
  }

  React.useEffect(() => {
    getSemanas();
    getCampañas();
    getFundos();
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
      <FilterAplicaciones
        show={filterAplicaciones}
        setShow={setFilterAplicaciones}
        rowsTable={rowsTableAplicaciones}
        setRowsTable={setRowsTableAplicaciones}
        rows={rowsAplicaciones}
        setRows={setRowsAplicaciones}
      />
      <Box sx={{ display: 'flex' }}>
        <NavbarEvaluador state={state}/>
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
                    fundo={fundo}
                    setFundo={setFundo}
                    campaña={campañaGrafico}
                    setCampaña={setCampañaGrafico}
                    semana={semana}
                    setSemana={setSemana}
                    semanas={semanas}
                    setSemanas={setSemanas}
                    fundos={fundos}
                    campañas={campañas}
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
                    setSearch={setSearch}
                    campañas={campañas}
                    setCampañas={setCampañas}
                    campaña={campaña}
                    setCampaña={setCampaña}
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
          state={state}
          value={numTab}
          setValue={setNumTab}
          search={search}
          setSearch={setSearch}
          rowsTableEvaluaciones={rowsTableEvaluaciones}
          setRowsTableEvaluaciones={setRowsTableEvaluaciones}
          rowsEvaluaciones={rowsEvaluaciones}
          setRowsEvaluaciones={setRowsEvaluaciones}
          rowsTableAplicaciones={rowsTableAplicaciones}
          setRowsTableAplicaciones={setRowsTableAplicaciones}
          rowsAplicaciones={rowsAplicaciones}
          setRowsAplicaciones={setRowsAplicaciones}
          semana={semana}
          setSemana={setSemana}
          vista={vista}
          setVista={setVista}
          campaña={campaña}
          setCampaña={setCampaña}
          campañaGrafico={campañaGrafico}
          setCampañaGrafico = {setCampañaGrafico}
          fundo={fundo}
          setFundo={setFundo}
          fechaInicio={selectedCampaña.fechaIni}
          />
      </Row>
    </Box>
    </div>
  )
}

export default GestionEvaluador