import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TablaCampañas from '../TablaCampañas';
import TablaLotes from '../TablaLotes';
import TablaEvaluadores from '../TablaEvaluadores';
import TablaPlagas from '../TablaPlagas';
import TablaPesticidas from '../TablaPesticidas';

function ColumnTabs({value, setValue, search, setSearch, rowsTableCampaña, setRowsTableCampaña, rowsCampaña, setRowsCampaña, rowsTableLote, setRowsTableLote, rowsLote, setRowsLote, rowsTablePlaga, setRowsTablePlaga, rowsPlaga, setRowsPlaga, rowsTablePesticida, setRowsTablePesticida, rowsPesticida, setRowsPesticida, rowsTableEvaluador, setRowsTableEvaluador, rowsEvaluador, setRowsEvaluador}) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: '100%', typography: 'caption', mt: 1}}>
      <TabContext value={value}>
        <Box display='flex' sx={{ borderBottom: 2, borderColor: '#074F57' }} >
        <Box display='flex'>
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
            <Tab label="Campañas" value="1" />
            <Tab label="Lotes" value="2" />
            <Tab label="Plagas" value="3" />
            <Tab label="Pesticidas" value="4" />
            <Tab label="Evaluadores" value="5" />
          </TabList>
        </Box>
        
        </Box>
        <TabPanel value="1">
          <TablaCampañas
            search={search}
            setSearch={setSearch}
            rowsTable={rowsTableCampaña}
            setRowsTable={setRowsTableCampaña}
            rows={rowsCampaña}
            setRows={setRowsCampaña}
          />
        </TabPanel>
        <TabPanel value="2">
          <TablaLotes
            search={search}
            setSearch={setSearch}
            rowsTable={rowsTableLote}
            setRowsTable={setRowsTableLote}
            rows={rowsLote}
            setRows={setRowsLote}
          />
        </TabPanel>
        <TabPanel value="3">
          <TablaPlagas
            search={search}
            setSearch={setSearch}
            rowsTable={rowsTablePlaga}
            setRowsTable={setRowsTablePlaga}
            rows={rowsPlaga}
            setRows={setRowsPlaga}
          />
        </TabPanel>
        <TabPanel value="4">
          <TablaPesticidas
            search={search}
            setSearch={setSearch}
            rowsTable={rowsTablePesticida}
            setRowsTable={setRowsTablePesticida}
            rows={rowsPesticida}
            setRows={setRowsPesticida}
          />
        </TabPanel>
        <TabPanel value="5">
        <TablaEvaluadores
            search={search}
            setSearch={setSearch}
            rowsTable={rowsTableEvaluador}
            setRowsTable={setRowsTableEvaluador}
            rows={rowsEvaluador}
            setRows={setRowsEvaluador}
          />
        </TabPanel>
      </TabContext>
    </Box>
    </div>
  )
}

export default ColumnTabs