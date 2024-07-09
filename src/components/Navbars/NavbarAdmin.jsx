import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {useNavigate} from "react-router-dom";

const drawerWidth = 60;

export default function NavbarAdmin() {
  let navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path, { state: state });
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer 
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        PaperProps={{
            sx: {
              backgroundColor: "#074F57",
              color: "white",
            }
          }}        
        variant="permanent"
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
            <img src={require("../../assets/Logo.png")} alt="logo" width={40}/>
        </Toolbar>
        <Divider />
        <List>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
            <ListItemButton sx={{
                  minHeight: 48,
                  px: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onClick={() => handleNavigate('/admin-home')}
                >
                <ListItemIcon sx={{
                    minWidth: 0,
                    mr: 'auto',
                  }}>
                  <MapOutlinedIcon style={{ color: 'white' }}/>
                </ListItemIcon>
                <Typography variant="caption" sx={{ fontSize: [7, "!important"], textAlign:"center", paddingTop: 0.5 }}>{'Mapa'}</Typography>
              </ListItemButton>
              <ListItemButton sx={{
                  minHeight: 48,
                  px: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onClick={() => handleNavigate('/admin-datos')}
                >
                <ListItemIcon sx={{
                    minWidth: 0,
                    mr: 'auto',
                  }}>
                  <TableChartOutlinedIcon style={{ color: 'white' }}/>
                </ListItemIcon>
                <Typography variant="caption" sx={{ fontSize: [7, "!important"], textAlign:"center", paddingTop: 0.5 }}>{'Gestión de datos'}</Typography>
              </ListItemButton>
              <ListItemButton sx={{
                  minHeight: 48,
                  px: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onClick={() => handleNavigate('/admin-movimientos')}
                >
                <ListItemIcon sx={{
                    minWidth: 0,
                    mr: 'auto',
                  }}>
                  <StackedLineChartOutlinedIcon style={{ color: 'white' }}/>
                </ListItemIcon>
                <Typography variant="caption" sx={{ fontSize: [7, "!important"], textAlign:"center", paddingTop: 0.5 }}>{'Gestión de movimientos'}</Typography>
              </ListItemButton>
            </Box>
          </Box>
        </List>
        <List sx={{ position: "absolute", bottom: "0" }}>
              <ListItemButton sx={{
                  minHeight: 48,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                href="/"
                >
                <ListItemIcon sx={{
                    minWidth: 0,
                    mr: 'auto',
                  }}>
                  <LogoutOutlinedIcon style={{ color: 'white' }}/>
                </ListItemIcon>
                <Typography variant="caption" sx={{ fontSize: [7, "!important"], textAlign:"center", paddingTop: 0.5 }}>{'Salir'}</Typography>
              </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
}