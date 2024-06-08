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
  } from "@mui/material";
import FilterCampañas from '../../components/Filters/FilterCampañas';
import FilterLotes from '../../components/Filters/FilterLotes';
import FilterPlagas from '../../components/Filters/FilterPlagas';
import FilterPesticidas from '../../components/Filters/FilterPesticidas';
import FilterUsuarios from '../../components/Filters/FilterUsuarios';

function GestionDatos() {
  const [numTab, setNumTab] = React.useState('1');
  const [search, setSearch] = React.useState("");
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
        setFilterCampaña(event.currentTarget);
        return;
      case '2':
        setFilterLote(event.currentTarget);
        return;
      case '3':
        setFilterPlaga(event.currentTarget);
        return;
      case '4':
        setFilterPesticida(event.currentTarget);
        return;
      case '5':
        setFilterEvaluador(event.currentTarget);
        return;
    }
  };

  return (
    <div>
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
        />
        </Row>
        
      </Box>
    </div>
  )
}

export default GestionDatos