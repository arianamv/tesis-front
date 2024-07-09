import React from 'react'
import Stack from '@mui/material/Stack';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { listarGravedades, listarSemanas } from '../../services/adminService';

function PerfilDetalles({show, setShow, state}) {
    const open = Boolean(show);
    const [estado, setEstado] = React.useState("");
    const [gravedad, setGravedad] = React.useState("");
    const [semana, setSemana] = React.useState("");
    let [semanas, setSemanas] = React.useState([]);
    let [gravedades, setGravedades] = React.useState([]);
    const id = open ? 'simple-popover' : undefined;
    const closeFilter = () => {
      setShow(null);
    };

    const handlePerfil = (perfil) => {
        if (perfil === 1) return 'Administrador'
        else return 'Evaluador'
    }
    
    return (
      <div>
        {
          <TrapFocus open disableAutoFocus disableEnforceFocus>
          <Popover
            id={id}
            open={open}
            anchorEl={show}
            onClose={closeFilter}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              style: { width: '20%' },
            }}
          >
              <Box
                display='grid'
                sx={{
                  m: 2,
                }}
              >
                  <Typography fontWeight="bold">Usuario</Typography>
                  <Divider/>
                  <Box display='flex' sx={{  mt:1 }}>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Nombre: {state.usuario.nombres + " " + state.usuario.apellidoPat + " " + state.usuario.apellidoMat}
                    </Typography>
                  </Box>
                  <Box display='flex' sx={{  mt:1 }}>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Perfil: {handlePerfil(state.usuario.Perfil_idPerfil)}
                    </Typography>
                  </Box>
                </Box>
            </Popover>
            </TrapFocus>
            }
      </div>
    )
}

export default PerfilDetalles