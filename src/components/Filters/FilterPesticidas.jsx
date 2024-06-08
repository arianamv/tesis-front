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
import { listarMetodos } from '../../services/adminService';

function FilterPesticidas({show, setShow, rowsTable, setRowsTable, rows, setRows}) {
    const open = Boolean(show);
    const id = open ? 'simple-popover' : undefined;
    const [metodo, setMetodo] = React.useState("");
    const [estado, setEstado] = React.useState("");
    let [metodos, setMetodos] = React.useState([]);
    const closeFilter = () => {
      setShow(null);
    };
    const handleMetodo = (event) => {
      setMetodo(event.target.value);
    };
    const handleEstado = (event) => {
      setEstado(event.target.value);
    };

    const getMetodos = () => {
      listarMetodos().then((response) => {
        setMetodos(response.data?.Pesticida)
        metodos = response.data?.Pesticida
      })
      console.log(metodos)
    }

    const onClickFilter = () => {
      if (metodo === "" && estado === "") setRowsTable(rows);
      if (metodo !== ""){
        setRowsTable(rows.filter(
          (key) => key.metodoAplicacion.includes(metodos[metodo-1].metodoAplicacion)
        ))
        if (estado === 0){
          setRowsTable(rows.filter(
            (key) => key.metodoAplicacion.includes(metodos[metodo-1].metodoAplicacion) &&
            key.estado === 0
          ))
        }
        if (estado === 0){
          setRowsTable(rows.filter(
            (key) => key.metodoAplicacion.includes(metodos[metodo-1].metodoAplicacion) &&
            key.estado === 1
          ))
        }
      }
      setShow(null);
      setMetodo("");
      setEstado("");
    }

    React.useEffect(() => {
      getMetodos()
    }, [])

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
                  <Typography fontWeight="bold">Filtrar</Typography>
                  <Divider/>
                  <Box display='flex' sx={{ mt:1 }}>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Método de aplicación:
                    </Typography>
                    <Select
                      id="metodo-select"
                      value={metodo}
                      onChange={handleMetodo}
                      size={'small'}
                      variant='standard'
                      sx={{ 
                        width: '100%',
                        ml: 2
                      }}
                    >
                      {metodos?.map((e) => (
                        <MenuItem key={e.group_id} value={e.group_id}>
                          {e.metodoAplicacion}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box display='flex' sx={{  mt:1 }}>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Estado:
                    </Typography>
                    <Select
                      id="cultivo-select"
                      value={estado}
                      onChange={handleEstado}
                      size={'small'}
                      variant='standard'
                      sx={{ 
                        width: '100%',
                        ml: 2
                      }}
                    >
                      <MenuItem value={0}>Inactivo</MenuItem>
                      <MenuItem value={1}>Activo</MenuItem>
                    </Select>
                  </Box>
                </Box>
                <Box
                  display='flex'
                  justifyContent={'flex-end'}
                  sx={{
                    mr: 2,
                    mb: 2
                  }}
                >
                  <Button size="small" onClick={closeFilter} sx={{ color: '#074F57', mr: 2 }}>
                    Cancelar
                  </Button>
                  <Button size="small" onClick={() => onClickFilter()} variant="contained" sx={{ backgroundColor: '#074F57' }}>
                    Filtrar
                  </Button>
                </Box>
            </Popover>
            </TrapFocus>
            }
      </div>
    )
}

export default FilterPesticidas