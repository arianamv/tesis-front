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

function ColumnTabsMov({value, setValue, search, setSearch, rowsTable,setRowsTable}) {
  const [vista, setVista] = React.useState(0);
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
              search={search}
              setSearch={setSearch}
            />)
          }
          {
            vista && <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={500}
            height={300}
          />
          }
        </TabPanel>
        <TabPanel value="2">
          <Typography sx={{ mb: 1 }}><b>Aplicaciones de pesticidas</b></Typography>
        </TabPanel>
      </TabContext>
    </Box>
    </div>
  )
}

export default ColumnTabsMov