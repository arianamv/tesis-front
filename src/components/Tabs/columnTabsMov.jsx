import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TablaCampañas from '../TablaCampañas';
import { LineChart } from '@mui/x-charts/LineChart';
import TablaEvaluaciones from '../TablaEvaluaciones';
import { listarSemanas } from '../../services/adminService';
import GraficoEvaluaciones from '../GraficoEvaluaciones';
import TablaAplicaciones from '../TablaAplicaciones';
import GraficoAplicaciones from '../GraficoAplicaciones';

function ColumnTabsMov({fechaInicio, value, setValue, search, setSearch, rowsTableEvaluaciones,setRowsTableEvaluaciones, rowsEvaluaciones, setRowsEvaluaciones, rowsTableAplicaciones, setRowsTableAplicaciones, rowsAplicaciones, setRowsAplicaciones, vista, setVista, semana, setSemana, campaña, setCampaña, campañaGrafico, setCampañaGrafico, fundo, setFundo}) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleVista = (event) => {
    setVista(event.target.value);
  }

  return (
    <div>
      <Box sx={{ width: '100%', typography: 'caption', mt: 1}}>
      <TabContext value={value}>
        <Box display='flex' sx={{ borderBottom: 2, borderColor: '#074F57' }} >
        <Box display='flex'sx={{ width: '70%' }}>
          <TabList 
            onChange={handleChange}
            aria-label="tabs-datos"
            sx={{
                pl: 1,
                pt: 1,
                ".Mui-selected": {
                    color: '#FFFFFF !important',
                    backgroundColor: '#074F57',
                    colorInterpolation: '#FFFFFF',
                },
            }}
            TabIndicatorProps={{
                style: {
                  backgroundColor: "#074F57",
                },
            }}
          >
            <Tab label="Evaluaciones" value="1" />
            <Tab label="Aplicaciones" value="2" />
          </TabList>
        </Box>
        <Box display={'flex'} justifyContent={'flex-end'} sx={{ width: '30%'}}>
          <Typography sx={{ mt: 2, mr: 2 }}>Visualizar: </Typography>
          <Select
            id="vista-select"
            value={vista}
            onChange={handleVista}
            size={'small'}
            variant='outlined'
            sx={{ 
                width: '100%',
                ml: 2,
                mb: 1
            }}
            >
            <MenuItem value={0}>Tabla</MenuItem>
            <MenuItem value={1}>Gráfico</MenuItem>
          </Select>
        </Box>
        </Box>
        <TabPanel value="1">
          {
            !vista &&
            (<TablaEvaluaciones
              fechaInicio={fechaInicio}
              search={search}
              setSearch={setSearch}
              rowsTable={rowsTableEvaluaciones}
              setRowsTable={setRowsTableEvaluaciones}
              rows={rowsEvaluaciones}
              setRows={setRowsEvaluaciones}
              campaña={campaña}
              setCampaña={setCampaña}
            />)
          }
          {
            vista && <GraficoEvaluaciones
              rowsTable={rowsTableEvaluaciones}
              fechaInicio={fechaInicio}
              setRowsTable={setRowsTableEvaluaciones}
              semana={semana}
              setSemana={setSemana}
              campaña={campañaGrafico}
              setCampaña={setCampañaGrafico}
              fundo={fundo}
              setFundo={setFundo}
            />
          }
        </TabPanel>
        <TabPanel value="2">
        {
            !vista &&
            (<TablaAplicaciones
              search={search}
              fechaInicio={fechaInicio}
              setSearch={setSearch}
              rowsTable={rowsTableAplicaciones}
              setRowsTable={setRowsTableAplicaciones}
              rows={rowsAplicaciones}
              setRows={setRowsAplicaciones}
              campaña={campaña}
              setCampaña={setCampaña}
            />)
          }
          {
            vista && <GraficoAplicaciones
            rowsTable={rowsTableEvaluaciones}
            fechaInicio={fechaInicio}
            setRowsTable={setRowsTableEvaluaciones}
            semana={semana}
            setSemana={setSemana}
            campaña={campañaGrafico}
            setCampaña={setCampañaGrafico}
            fundo={fundo}
            setFundo={setFundo}
          />
          }
        </TabPanel>
      </TabContext>
    </Box>
    </div>
  )
}

export default ColumnTabsMov