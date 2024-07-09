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
import TablaEvaluacionesEval from '../TablaEvaluacionesEval';
import { useLocation } from 'react-router-dom';

function ColumnTabsEva({fechaInicio, state, value, setValue, search, setSearch, rowsTableEvaluaciones,setRowsTableEvaluaciones, rowsEvaluaciones, setRowsEvaluaciones, rowsTableAplicaciones, setVista, campaña, setCampaña}) {

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
              </TabList>
            </Box>
            </Box>
            <TabPanel value="1">
                <TablaEvaluacionesEval
                  state={state}
                  search={search}
                  setSearch={setSearch}
                  rowsTable={rowsTableEvaluaciones}
                  setRowsTable={setRowsTableEvaluaciones}
                  rows={rowsEvaluaciones}
                  setRows={setRowsEvaluaciones}
                  campaña={campaña}
                  setCampaña={setCampaña}
                  fechaInicio={fechaInicio}
                />
            </TabPanel>
          </TabContext>
        </Box>
        </div>
      )
}

export default ColumnTabsEva