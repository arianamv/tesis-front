import React, {useState} from 'react'
import NavBarAdmin from '../../components/NavbarAdmin'
import Typography from '@mui/material/Typography';
import ColumnTabs from '../../components/Tabs/columnTabs';
import Row from 'react-bootstrap/Row';
import Box from '@mui/material/Box';
import SearchIcon from "@mui/icons-material/Search";
import {
    Divider,
    Grid,
    InputAdornment,
    Paper,
    TextField,
    Button,
    Container,
    Stack,
  } from "@mui/material";

function GestionDatos() {
  const [numTab, setNumTab] = React.useState('1');
  const [rowsTable, setRowsTable] = React.useState([]);
  const [rowsCamp, setRowsCamp] = React.useState([]);
  const [rowsLote, setRowsLote] = React.useState([]);
  const [rowsPlaga, setRowsPlaga] = React.useState([]);
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

  const onSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
      <NavBarAdmin/>
        <Row>
        <Typography variant='h6' 
          sx={{ 
            pt: 3, 
            pl: 3, 
            fontWeight: 'medium',
            color: '#103A5E'
        }}>
            Gestión de movimientos
        </Typography>

        <Box sx={{
            mt: 1,
            ml: 3,
            pb: 2,
            pl: 2,
            width: '100%',
            border: 1,
            borderColor: '#D3D3D3',
            justifyContent: 'center',
            display: 'flex'
        }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{
                    xs: 1,
                    sm: 2,
                    md: 3,
                }}
              >
                <Grid item xs={6}>
                  <TextField
                    value={search}
                    label={searchLabel}
                    onChange={onSearch}
                    fullWidth={true}
                    variant="standard"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                
              </Grid>
            </Box>

        <ColumnTabs
          value={numTab}
          setValue={setNumTab}
          search={search}
          setSearch={setSearch}
          rowsTable={rowsTable}
          setRowsTable={setRowsTable}
        />
        </Row>
        
      </Box>
    </div>
  )
}

export default GestionDatos