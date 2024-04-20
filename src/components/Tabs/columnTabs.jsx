import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TableCampaña from '../TableCampañas';

function ColumnTabs({value, setValue, search, setSearch, rowsTable,setRowsTable}) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList 
            onChange={handleChange}
            aria-label="tabs-datos"
            sx={{
                pl: 1,
                pt: 1,
                ".Mui-selected": {
                    color: 'white',
                    backgroundColor: '#074F57',
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
        <TabPanel value="1">
          <TableCampaña
            search={search}
            setSearch={setSearch}
            rowsTable={rowsTable}
            setRowsTable={setRowsTable}
          />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
        <TabPanel value="4">Item Two</TabPanel>
        <TabPanel value="5">Item Three</TabPanel>
      </TabContext>
    </Box>
    </div>
  )
}

export default ColumnTabs