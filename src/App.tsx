import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import Dashboard from "./pages/Dashboard/Dashboard";

import Inventario from "./pages/Inventario/Inventario";
import Compras from "./pages/Compras/Compras";
import Ventas from "./pages/Ventas/Ventas";
import Informes from "./pages/Informes/Informes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/inventario" element={<Inventario />} />
      <Route path="/compras" element={<Compras />} />
      <Route path="/ventas" element={<Ventas />} />
      <Route path="/informes" element={<Informes />} />
    </Routes>
  );
}

export default App;