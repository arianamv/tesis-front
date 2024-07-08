import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './screens/Login/Login';
import InicioAdmin from './screens/Administrador/InicioAdmin';
import GestionDatos from './screens/Administrador/GestionDatos';
import GestionMovimientos from './screens/Administrador/GestionMovimientos';
import InicioEvaluador from './screens/Evaluador/InicioEvaluador';
import GestionEvaluador from './screens/Evaluador/GestionEvaluador';
import NavbarAdmin from './components/Navbars/NavbarAdmin';
import NavbarEvaluador from './components/Navbars/NavbarEvaluador';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/admin-home" element={<InicioAdmin />}></Route>
        <Route path="/eval-home" element={<InicioEvaluador />}></Route>
        <Route path="/admin-datos" element={<GestionDatos />}></Route>
        <Route path="/admin-movimientos" element={<GestionMovimientos />}></Route>
        <Route path="/eval-movimientos" element={<GestionEvaluador />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
