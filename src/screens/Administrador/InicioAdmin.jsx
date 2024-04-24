import React from 'react'
import NavBarAdmin from '../../components/Navbars/NavbarAdmin'
import Bar from '../../components/Bar'
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import BarraAlertas from '../../components/BarraAlertas';
import MapView from '../../components/MapView';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function InicioAdmin() {
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
      <Bar/>
      <NavBarAdmin/>
      <BarraAlertas/>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Container>
        <Row className='mb-4' display='flex'>
          <Col>
            <MapView/>
          </Col>
        </Row>
        </Container>
      </Box>
    </Box>
    </div>
  )
}

export default InicioAdmin