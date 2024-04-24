import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './screens/Login/Login';
import InicioAdmin from './screens/Administrador/InicioAdmin';
import GestionDatos from './screens/Administrador/GestionDatos';
import GestionMovimientos from './screens/Administrador/GestionMovimientos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<InicioAdmin />}></Route>
        <Route path="/datos" element={<GestionDatos />}></Route>
        <Route path="/movimientos" element={<GestionMovimientos />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
