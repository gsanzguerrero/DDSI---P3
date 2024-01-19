import { NativeRouter, Route, Routes } from 'react-router-native';
import { View } from 'react-native'; // Importa View desde 'react-native', no desde 'react'
import App from './App';
import Menú from './Menú/Menu';
import Clientes from './Clientes/Clientes';
import Pedidos from './Pedidos/Pedidos';
import Reservas from './Reservas/Reservas';
import Trabajadores from './Trabajadores/Trabajadores';
import Mensaje from './Mensaje';
import CrearCliente from './Clientes/CrearCliente';
import EditarCliente from './Clientes/EditarCliente';


const Index = () => {
  return (
    <NativeRouter>
      <View style={{ flex: 1 }}>
        <Routes>
          <Route path="/" exact element={<App />} />
          <Route path='/menu' exact element={<Menú/>}/>
          <Route path='/clientes' exact element={<Clientes/>}/>
          <Route path='/pedidos' exact element={<Pedidos/>}/>
          <Route path='/reservas' exact element={<Reservas/>}/>
          <Route path='/trabajadores' exact element={<Trabajadores/>}/>
          <Route path="/mensaje" exact element={<Mensaje/>}/>
          <Route path="/crearcliente" exact element={<CrearCliente/>}/>
          <Route path="/editarcliente" exact element={<EditarCliente/>}/>
        </Routes>
      </View>
    </NativeRouter>
  );
};

export default Index;

