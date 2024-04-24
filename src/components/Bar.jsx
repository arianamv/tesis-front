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

const drawerWidth = 300;

function Bar() {
  const fundos = ["Santa Rosa", "Santo Domingo"];
  const [age, setAge] = React.useState('');
  const [fundo, setFundo] = React.useState('');
  const [campania, setCampania] = React.useState('');
  const [semana, setSemana] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
            Campaña:
          </Typography>
          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="campaña"
              id="campaña-select"
              variant='standard'
              value={fundo}
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
          <Typography sx={{ color: 'white' }}>
            Fundo:
          </Typography>
          <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="fundo"
              id="fundo-select"
              value={campania}
              variant='standard'
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