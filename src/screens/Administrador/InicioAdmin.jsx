import React from 'react'
import NavBarAdmin from '../../components/Navbars/NavbarAdmin'
import Bar from '../../components/Bar'
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import BarraAlertas from '../../components/BarraAlertas';
import MapView from '../../components/MapView';
import CircularProgress from '@mui/material/CircularProgress';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { getFundo, listarCampanias, listarCoordenadaXLote, listarLoteXFundo, listarLotesXCampañaXFundo } from '../../services/adminService';

function InicioAdmin() {
  let [fundo, setFundo] = React.useState(2);
  let [lotes, setLotes] = React.useState(-1);
  let [campania, setCampania] = React.useState(4);
  let [cargaCoord, setCargaCoord] = React.useState(-1);
  let [fundoObject, setFundoObject] = React.useState('');

  const getLotesXFundo = (fundo) => {
    console.log(fundo)
    listarLoteXFundo(fundo).then((response) => {
      if(response?.data){
        if(response?.data.Lote){
          let auxLotes = [];
          for(let i = 0; i < response?.data?.Lote?.length; i++){
            auxLotes.push({
              idLote: response?.data.Lote[i].idLote,
              nombreLote: response?.data.Lote[i].nombreLote,
              descripcion: response?.data.Lote[i].descripcion,
              tamanio: response?.data.Lote[i].tamanio,
              estado: response?.data.Lote[i].estado,
              idFundo: response?.data.Lote[i].Fundo_idFundo,
              coordenadas: response?.data.Lote[i].coordenadas,
            })
          }
          setLotes(auxLotes);
          lotes = auxLotes;
          console.log(lotes)
        }
      }
    })
  }

  const getLotesXCampañaXFundo = (data) => {
    console.log(data)
    listarLotesXCampañaXFundo(data).then((response) => {
      if(response?.data){
        if(response?.data.Lote){
          let auxLotes = [];
          for(let i = 0; i < response?.data?.Lote?.length; i++){
            auxLotes.push({
              idCampañaXLote: response?.data.Lote[i].idCampañaXLote,
              estado: response?.data.Lote[i].estado,
              gravedad: response?.data.Lote[i].gravedad,
              idFundo: response?.data.Lote[i].Lote_Fundo_idFundo,
              idCampañaXCultivo: response?.data.Lote[i].CampañaXCultivo_idCampañaXCultivo,
              idCampaña: response?.data.Lote[i].CampañaXCultivo_Campaña_idCampaña,
              idCultivo: response?.data.Lote[i].CampañaXCultivo_Cultivo_idCultivo,
              numPlantas: response?.data.Lote[i].numPlantas,
              numSurcos: response?.data.Lote[i].numSurcos,
              nombreLote: response?.data.Lote[i].nombreLote,
              tamanio: response?.data.Lote[i].tamanio,
              estadoLote: response?.data.Lote[i].estadoLote,
              nombreCultivo: response?.data.Lote[i].nombreCultivo,
              nombreVariedad: response?.data.Lote[i].nombreVariedad,
              coordenadas: response?.data.Lote[i].coordenadas,
            })
          }
          setLotes(auxLotes);
          lotes = auxLotes;
          console.log(lotes)
        }
      }
    })
  }

  const listFundo = (fundo) => {
    getFundo(fundo).then((response) => {
      if(response?.data){
        setFundoObject(response.data.Fundo)
        fundoObject = response.data.Fundo
        console.log(fundoObject)
      }
    })
  }
  
  React.useEffect(() => {
    let data = {
      "idFundo": fundo,
      "idCampania": campania
    }
    let idFundo = {
      "nombre_id": fundo
    }
    //getLotesXFundo(idFundo)
    getLotesXCampañaXFundo(data)
    listFundo(idFundo)
    console.log(lotes)
  }, [])

  React.useEffect(() => {
    let data = {
      "idFundo": fundo,
      "idCampania": campania
    }
    let idFundo = {
      "nombre_id": fundo
    }
    console.log(idFundo)
    //getLotesXFundo(idFundo)
    getLotesXCampañaXFundo(data)
    listFundo(idFundo)
    console.log(lotes)
  }, [fundo, campania])

  return (lotes !== -1) ?(
    <div>
      <Box sx={{ display: 'flex' }}>
      <Bar
        fundo={fundo}
        setFundo={setFundo}
        campania={campania}
        setCampania={setCampania}
      />
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
            <MapView
              fundo={fundo}
              lotes={lotes}
              fundoObject={fundoObject[0]}
            />
          </Col>
        </Row>
        </Container>
      </Box>
    </Box>
    </div>
  ): (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}

export default InicioAdmin