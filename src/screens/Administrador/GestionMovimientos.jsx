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
  } from "@mui/material";
import ColumnTabsMov from '../../components/Tabs/columnTabsMov';

function GestionMovimientos() {
  const [numTab, setNumTab] = React.useState('1');
  const [rowsTable, setRowsTable] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const onSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
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
              <IconButton>
                <FilterAltIcon style={{ color: "#074F57" }}/>
              </IconButton>
            </Box>
          </Box>
          <ColumnTabsMov
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

export default GestionMovimientos