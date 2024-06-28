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
import { getFundo, listarCampanias, listarCoordenadaXLote, listarEvaluacionesXSemana, listarFundos, listarLoteXFundo, listarLotesXCampañaXFundo } from '../../services/adminService';
import NavbarEvaluador from '../../components/Navbars/NavbarEvaluador';

function InicioEvaluador() {
    let [fundo, setFundo] = React.useState(2);
    let [lotes, setLotes] = React.useState(-1);
    let [campania, setCampania] = React.useState(4);
    let [semana, setSemana] = React.useState(1);
    let [cargaCoord, setCargaCoord] = React.useState(-1);
    let [uvaCheck, setUvaCheck] = React.useState(true);
    let [paltaCheck, setPaltaCheck] = React.useState(true);
    let [aranCheck, setAranCheck] = React.useState(true);
    let [fundos, setFundos] = React.useState(-1);
    let [evaluaciones, setEvaluaciones] = React.useState(-1);
    const [fundoObject, setFundoObject] = React.useState(-1);
    let [plagas, setPlagas] = React.useState([]);
    let [cultivos, setCultivos] = React.useState([]);
  
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
                fechaCosecha: response?.data.Lote[i].fechCosecha,
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
  
    const getEvaluacionesXSemana = (data) => {
      listarEvaluacionesXSemana(data).then((response) => {
        if(response?.data){
          if(response?.data.Evaluacion){
            let auxLotes = [];
            for(let i = 0; i < response?.data?.Evaluacion?.length; i++){
              auxLotes.push({
                idEvaluacion: response?.data.Evaluacion[i].idEvaluacion,
                estado: response?.data.Evaluacion[i].estado,
                fecha: response?.data.Evaluacion[i].fecha,
                idCampañaXLote: response?.data.Evaluacion[i].CampañaXLote_idCampañaXLote,
                semana: response?.data.Evaluacion[i].semana,
                cantEncontrada: response?.data.Evaluacion[i].cantEncontrada,
                gravedad: response?.data.Evaluacion[i].gravedad,
                idPlaga: response?.data.Evaluacion[i].idPlaga,
                nombrePlaga: response?.data.Evaluacion[i].nombrePlaga,
                usuario: response?.data.Evaluacion[i].nombres + " " + response?.data.Evaluacion[i].apellidoPat + " " + response?.data.Evaluacion[i].apellidoMat
              })
            }
            setEvaluaciones(auxLotes);
            evaluaciones = auxLotes;
          }
        }
      })
    }
  
    const getFundos = () => {
      listarFundos().then((response) => {
        setFundos(response.data?.Fundo)
        fundos = response.data?.Fundo
      })
    }
  
    React.useEffect(() => {
      let data = {
        "idFundo": fundo,
        "idCampania": campania
      }
      let dataEval = {
        "nombre_id": semana,
      }
      //getLotesXFundo(idFundo)
      getLotesXCampañaXFundo(data)
      getFundos()
      getEvaluacionesXSemana(dataEval)
      console.log("Eval", evaluaciones)
    }, [])
  
    React.useEffect(() => {
      let data = {
        "idFundo": fundo,
        "idCampania": campania
      }
      let dataEval = {
        "nombre_id": semana,
      }
      //getLotesXFundo(idFundo)
      getLotesXCampañaXFundo(data)
      getEvaluacionesXSemana(dataEval)
      console.log("Eval", evaluaciones)
    }, [fundo, campania, semana])
  
  
    return (lotes !== -1 && fundos !== -1 && evaluaciones !== -1) ?(
      <div>
        <Box sx={{ display: 'flex' }}>
        <Bar
          fundo={fundo}
          fundos={fundos}
          setFundo={setFundo}
          fundoObject={fundoObject}
          setFundoObject={setFundoObject}
          campania={campania}
          setCampania={setCampania}
          semana={semana}
          setSemana={setSemana}
        />
        <NavbarEvaluador/>
        <BarraAlertas
          evaluaciones={evaluaciones}
          lotes={lotes}
          plagas={plagas}
          setPlagas={setPlagas}
          cultivos={cultivos}
          setCultivos={setCultivos}
          uvaCheck={uvaCheck}
          setUvaCheck={setUvaCheck}
          paltaCheck={paltaCheck}
          setPaltaCheck={setPaltaCheck}
          aranCheck={aranCheck}
          setAranCheck={setAranCheck}
          semana={semana}
        />
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
                plagas={plagas}
                cultivos={cultivos}
                fundos={fundos}
                evaluaciones={evaluaciones}
                selectedFundo={fundoObject}
                selectedSemana={semana}
                setSelectedFundo={setFundoObject}
                uvaCheck={uvaCheck}
                paltaCheck={paltaCheck}
                aranCheck={aranCheck}
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

export default InicioEvaluador