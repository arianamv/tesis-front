import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { listarCampanias, listarFundos } from '../services/adminService';

const drawerWidth = 300;

function Bar({fundo, setFundo, campania, setCampania}) {
  const [age, setAge] = React.useState('');
  const [selectedFundo, setSelectedFundo] = React.useState(2);
  const [selectedCampania, setSelectedCampania] = React.useState(4);
  const [semana, setSemana] = React.useState('');
  let [campanias, setCampanias] = React.useState([]);
  let [fundos, setFundos] = React.useState([]);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangeFundo = (e) => {
    setSelectedFundo(e.target.value);
    setFundo(e.target.value);
    fundo = e.target.value
    console.log(fundo)
  }

  const handleChangeCampania = (e) => {
    setSelectedCampania(e.target.value);
    setCampania(e.target.value);
    campania = e.target.value
    console.log(campania)
  }

  React.useEffect(() => {
    listarFundos().then((response) => {
      setFundos(response.data?.Fundo)
      fundos = response.data?.Fundo
    })
    listarCampanias().then((response) => {
      setCampanias(response.data?.Campaña)
      campanias = response.data?.Campaña
    })
  }, [])

  return (
    <div>
    <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            backgroundColor: '#74A57F',
            height: 60,
            display: 'flex',
        }}
      >
        <Toolbar>
        <Typography sx={{ color: 'white' }}>
            Fundo:
          </Typography>
          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="fundo"
              id="fundo"
              value={selectedFundo}
              variant='standard'
              onChange={handleChangeFundo}
              name="fundo"
              sx={{ 
                width: 200,
                marginRight: 50,
                backgroundColor: 'white'
              }}
            >
              {fundos?.map((e) => (
                <MenuItem key={e.idFundo} value={e.idFundo}>
                  {e.nombreFundo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography sx={{ color: 'white' }}>
            Campaña:
          </Typography>
          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="campaña"
              id="campaña-select"
              variant='standard'
              value={selectedCampania}
              onChange={handleChangeCampania}
              name="campania"
              sx={{ 
                width: 200,
                marginRight: 50,
                backgroundColor: 'white'
              }}
            >
              {campanias?.map((e) => (
                <MenuItem key={e.idCampaña} value={e.idCampaña}>
                  {e.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography sx={{ color: 'white' }}>
            Semana:
          </Typography>
          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="semana"
              id="semana-select"
              variant='standard'
              value={semana}
              onChange={handleChange}
              sx={{ 
                width: 200,
                marginRight: 50,
                backgroundColor: 'white'
              }}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <IconButton
              size="large"
              edge="end"
            >
              <AccountCircle />
            </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Bar