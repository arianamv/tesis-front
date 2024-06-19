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

function FilterAplicaciones({show, setShow, rowsTable, setRowsTable, rows, setRows}) {
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
    const handleEstado = (event) => {
      setEstado(event.target.value);
    };
    const handleSemana = (event) => {
        setSemana(event.target.value);
    };
    const handleGravedad = (event) => {
        setGravedad(event.target.value);
        console.log(gravedad)
    };

    const getSemanas = () => {
        listarSemanas().then((response) => {
          setSemanas(response.data?.Evaluacion)
          semanas = response.data?.Evaluacion
        })
    }

    const getGravedades = () => {
        listarGravedades().then((response) => {
          setGravedades(response.data?.Evaluacion)
          gravedades = response.data?.Evaluacion
        })
    }

    React.useEffect(() => {
        getSemanas();
        getGravedades();
    }, [])

    const onClickFilter = () => {
        if (semana === "" && gravedad === "" && estado === "")
          setRowsTable(rows);
        if (semana !== ""){
          setRowsTable(rows.filter(
            (key) => key.semana === (semanas[semana-1].semana)
          ))
          if (gravedad !== ""){
            setRowsTable(rows.filter(
                (key) => key.gravedad === (gravedades.find((element) => {return element.gravedad == gravedad}).gravedad) &&
                key.semana === (semanas[semana-1].semana)
              ))
            if (estado === 0){
                setRowsTable(rows.filter(
                    (key) => key.gravedad === (gravedades.find((element) => {return element.gravedad == gravedad}).gravedad) &&
                    key.semana === (semanas[semana-1].semana) && key.estado === 0
                  ))
            }
            if (estado === 1){
                setRowsTable(rows.filter(
                    (key) => key.gravedad === (gravedades.find((element) => {return element.gravedad == gravedad}).gravedad) &&
                    key.semana === (semanas[semana-1].semana) && key.estado === 1
                  ))
            }
          }
        }
        setShow(null);
        setSemana("");
        setGravedad("");
        setEstado("");
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
                  <Typography fontWeight="bold">Filtrar</Typography>
                  <Divider/>
                  <Box display='flex' sx={{  mt:1 }}>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Campaña:
                    </Typography>
                    <Select
                      id="semana-select"
                      value={semana}
                      onChange={handleSemana}
                      size={'small'}
                      variant='standard'
                      sx={{ 
                        width: '100%',
                        ml: 2
                      }}
                    >
                      {semanas?.map((e) => (
                        <MenuItem key={e.idSemana} value={e.semana}>
                          {e.semana}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box display='flex' sx={{  mt:1 }}>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Lote:
                    </Typography>
                    <Select
                      id="gravedad-select"
                      value={gravedad}
                      onChange={handleGravedad}
                      size={'small'}
                      variant='standard'
                      sx={{ 
                        width: '100%',
                        ml: 2
                      }}
                    >
                      {gravedades?.map((e) => (
                        <MenuItem key={e.idGravedad} value={e.gravedad}>
                          {e.gravedad}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box display='flex' sx={{  mt:1 }}>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Estado:
                    </Typography>
                    <Select
                      id="estado-select"
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

export default FilterAplicaciones