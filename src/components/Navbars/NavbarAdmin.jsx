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

          {['Mapa', 'Gestión de datos', 'Gestión de movimientos', 'Salir'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{justifyContent: 'center'}}>
              {index === 0 ? (
                <ListItemButton sx={{
                  minHeight: 48,
                  px: 2.5,
                  display: 'grid',
                  justifyContent: 'center'
                }}
                href="/home"
                >
                <ListItemIcon sx={{
                    minWidth: 0,
                    mr: 'auto',
                  }}>
                  <MapOutlinedIcon style={{ color: 'white' }}/>
                </ListItemIcon>
                <Typography variant="caption" sx={{ fontSize: [7, "!important"], textAlign:"center", paddingTop: 0.5 }}>{text}</Typography>
              </ListItemButton>
              ) : index === 1 ? (
                <ListItemButton sx={{
                  minHeight: 48,
                  px: 2.5,
                  display: 'grid',
                  justifyContent: 'center'
                }}
                href="/datos"
                >
                <ListItemIcon sx={{
                    minWidth: 0,
                    mr: 'auto',
                  }}>
                  <TableChartOutlinedIcon style={{ color: 'white' }}/>
                </ListItemIcon>
                <Typography variant="caption" sx={{ fontSize: [7, "!important"], textAlign:"center", paddingTop: 0.5 }}>{text}</Typography>
              </ListItemButton>
              ) : index === 2 ? (
                <ListItemButton sx={{
                  minHeight: 48,
                  px: 2.5,
                  display: 'grid',
                  justifyContent: 'center'
                }}
                href='/movimientos'
                >
                <ListItemIcon sx={{
                    minWidth: 0,
                    mr: 'auto',
                  }}>
                  <StackedLineChartOutlinedIcon style={{ color: 'white' }}/>
                </ListItemIcon>
                <Typography variant="caption" sx={{ fontSize: [7, "!important"], textAlign:"center", paddingTop: 0.5 }}>{text}</Typography>
              </ListItemButton>
              ) : (
                <ListItemButton sx={{
                  minHeight: 48,
                  px: 2.5,
                  display: 'grid',
                  justifyContent: 'center'
                }}
                href="/movimientos"
                >
                <ListItemIcon sx={{
                    minWidth: 0,
                    mr: 'auto',
                  }}>
                  <LogoutOutlinedIcon style={{ color: 'white' }}/>
                </ListItemIcon>
                <Typography variant="caption" sx={{ fontSize: [7, "!important"], textAlign:"center", paddingTop: 0.5 }}>{text}</Typography>
              </ListItemButton>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}