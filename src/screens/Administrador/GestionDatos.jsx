import React, {useState} from 'react'
import NavBarAdmin from '../../components/Navbars/NavbarAdmin'
import Typography from '@mui/material/Typography';
import ColumnTabs from '../../components/Tabs/columnTabs';
import Row from 'react-bootstrap/Row';
import Box from '@mui/material/Box';
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from '@mui/icons-material/AccountCircle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
    InputAdornment,
    TextField,
    IconButton,
    MenuItem,
    Select,
  } from "@mui/material";
import FilterCampañas from '../../components/Filters/FilterCampañas';
import FilterLotes from '../../components/Filters/FilterLotes';
import FilterPlagas from '../../components/Filters/FilterPlagas';
import FilterPesticidas from '../../components/Filters/FilterPesticidas';
import FilterUsuarios from '../../components/Filters/FilterUsuarios';
import { listarCampanias, listarFundos } from '../../services/adminService';
import FilterFundos from '../../components/Filters/FilterFundos';

function SearchBarCampaña({search, setSearch, campañas, setCampañas, campaña, setCampaña}) {
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

function SearchBarFundo({search, setSearch, fundos, setFundos, fundo, setFundo}) {
  const onSearch = (event) => {
    setSearch(event.target.value);
  };
  
  const handleSelect = (event) => {
    setFundo(event.target.value);
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
    <Typography>Fundo: </Typography>
    <Select
      id="vista-select"
      value={fundo}
      onChange={handleSelect}
      size={'small'}
      variant='outlined'
      sx={{ 
          width: '100%',
          ml: 2,
      }}
      >
      {fundos?.map((e) => (
        <MenuItem key={e.idFundo} value={e.idFundo}>
          {e.nombreFundo}
        </MenuItem>
      ))}
    </Select>
    </Box>
    </Box>
  )
}

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

function GestionDatos() {
  const [numTab, setNumTab] = React.useState('1');
  const [search, setSearch] = React.useState("");
  const [filterFundo, setFilterFundo] = React.useState(null);
  let [rowsTableFundo, setRowsTableFundo] = React.useState(-1);
  let [rowsFundo, setRowsFundo] = React.useState(-1);
  const [filterCampaña, setFilterCampaña] = React.useState(null);
  let [rowsTableCampaña, setRowsTableCampaña] = React.useState(-1);
  let [rowsCampaña, setRowsCampaña] = React.useState(-1);
  const [filterLote, setFilterLote] = React.useState(null);
  let [rowsTableLote, setRowsTableLote] = React.useState(-1);
  let [rowsLote, setRowsLote] = React.useState(-1);
  const [filterPlaga, setFilterPlaga] = React.useState(null);
  let [rowsTablePlaga, setRowsTablePlaga] = React.useState(-1);
  let [rowsPlaga, setRowsPlaga] = React.useState(-1);
  const [filterPesticida, setFilterPesticida] = React.useState(null);
  let [rowsTablePesticida, setRowsTablePesticida] = React.useState(-1);
  let [rowsPesticida, setRowsPesticida] = React.useState(-1);
  const [filterEvaluador, setFilterEvaluador] = React.useState(null);
  let [rowsTableEvaluador, setRowsTableEvaluador] = React.useState(-1);
  let [rowsEvaluador, setRowsEvaluador] = React.useState(-1);

  const onSearch = (event) => {
    setSearch(event.target.value);
  };

  const openFilter = (event) => {
    switch (numTab){
      case '1':
        setFilterFundo(event.currentTarget);
        return;
      case '2':
        setFilterCampaña(event.currentTarget);
        return;
      case '3':
        setFilterLote(event.currentTarget);
        return;
      case '4':
        setFilterPlaga(event.currentTarget);
        return;
      case '5':
        setFilterPesticida(event.currentTarget);
        return;
      case '6':
        setFilterEvaluador(event.currentTarget);
        return;
    }
  };

  const [campaña, setCampaña] = React.useState(4);
  let [campañas, setCampañas] = React.useState([]);
  const getCampañas = () => {
    listarCampanias().then((response) => {
      setCampañas(response.data?.Campaña)
      campañas = response.data?.Campaña
    })
  }

  const [fundo, setFundo] = React.useState(1);
  let [fundos, setFundos] = React.useState([]);
  const getFundos = () => {
    listarFundos().then((response) => {
      setFundos(response.data?.Fundo)
      fundos = response.data?.Fundo
    })
  }

  React.useEffect(() => {
    getFundos();
    getCampañas();
  }, [])

  return (
    <div>
      <FilterFundos
        show={filterFundo}
        setShow={setFilterFundo}
        rowsTable={rowsTableFundo}
        setRowsTable={setRowsTableFundo}
        rows={rowsFundo}
        setRows={setRowsFundo}
      />
      <FilterCampañas
        show={filterCampaña}
        setShow={setFilterCampaña}
        rowsTable={rowsTableCampaña}
        setRowsTable={setRowsTableCampaña}
        rows={rowsCampaña}
        setRows={setRowsCampaña}
      />
      <FilterLotes
        show={filterLote}
        setShow={setFilterLote}
        rowsTable={rowsTableLote}
        setRowsTable={setRowsTableLote}
        rows={rowsLote}
        setRows={setRowsLote}
      />
      <FilterPlagas
        show={filterPlaga}
        setShow={setFilterPlaga}
        rowsTable={rowsTablePlaga}
        setRowsTable={setRowsTablePlaga}
        rows={rowsPlaga}
        setRows={setRowsPlaga}
      />
      <FilterPesticidas
        show={filterPesticida}
        setShow={setFilterPesticida}
        rowsTable={rowsTablePesticida}
        setRowsTable={setRowsTablePesticida}
        rows={rowsPesticida}
        setRows={setRowsPesticida}
      />
      <FilterUsuarios
        show={filterEvaluador}
        setShow={setFilterEvaluador}
        rowsTable={rowsTableEvaluador}
        setRowsTable={setRowsTableEvaluador}
        rows={rowsEvaluador}
        setRows={setRowsEvaluador}
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
        
              {numTab === '2' && (
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
                  <SearchBarFundo
                  search={search}
                  setSearch={search}
                  fundos={fundos}
                  setFundos={setFundos}
                  fundo={fundo}
                  setFundo={setFundo}
                />
                </Box>
                <Box display='flex' justifyContent='center' alignItems='center' sx={{ width: '5%' }}>
              <IconButton onClick={openFilter}>
                <FilterAltIcon style={{ color: "#074F57" }}/>
              </IconButton>
            </Box>
          </Box>
              )}
              {numTab === '3' && (
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
                  <SearchBarCampaña
                  search={search}
                  setSearch={search}
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
              {numTab !== '3' && numTab !=='2' && (
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
            

        <ColumnTabs
          value={numTab}
          setValue={setNumTab}
          search={search}
          setSearch={setSearch}
          rowsTableFundo={rowsTableFundo}
          setRowsTableFundo={setRowsTableFundo}
          rowsFundo={rowsFundo}
          setRowsFundo={setRowsFundo}
          rowsTableCampaña={rowsTableCampaña}
          setRowsTableCampaña={setRowsTableCampaña}
          rowsCampaña={rowsCampaña}
          setRowsCampaña={setRowsCampaña}
          rowsTableLote={rowsTableLote}
          setRowsTableLote={setRowsTableLote}
          rowsLote={rowsLote}
          setRowsLote={setRowsLote}
          rowsTablePlaga={rowsTablePlaga}
          setRowsTablePlaga={setRowsTablePlaga}
          rowsPlaga={rowsPlaga}
          setRowsPlaga={setRowsPlaga}
          rowsTablePesticida={rowsTablePesticida}
          setRowsTablePesticida={setRowsTablePesticida}
          rowsPesticida={rowsPesticida}
          setRowsPesticida={setRowsPesticida}
          rowsTableEvaluador={rowsTableEvaluador}
          setRowsTableEvaluador={setRowsTableEvaluador}
          rowsEvaluador={rowsEvaluador}
          setRowsEvaluador={setRowsEvaluador}
          fundo={fundo}
          setFundo={setFundo}
          campaña={campaña}
          setCampaña={setCampaña}
        />
        </Row>
        
      </Box>
    </div>
  )
}

export default GestionDatos