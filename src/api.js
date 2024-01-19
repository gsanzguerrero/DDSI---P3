const express = require('express');
const dotenv = require('dotenv'); // Uso dotenv para mantener seguro datos vulnerables
const cors = require('cors'); // Uso CORS para poder utilizar la API desde la app (Seguridad)
const mysql = require('mysql2');
const fs = require('fs');
const multer = require('multer');
const app = express();

app.use(cors());
app.use(express.json());

// Revisar siempre si no va bien conexión a BD

const dbConfig = {
  //host: "localhost",
  host: "localhost",
  user: "root",
  password: "admin",
  database: "ddsip3",
  port: "3000"
};

async function abrirConexion(){
  const connection = await mysql.createConnection(dbConfig);
  return connection;
} 


app.post('/crearcliente', async (req, res) => {
  try {
    const connection = await abrirConexion();
    const { email, nombre, date, username, contraseña, domicilio, datosPago } = req.body;
    const querySelect = 'INSERT INTO CLIENTES (IdCliente, Nombre, Username, Contrasenia, Domicilio, Puntos, FechaNacimiento, DatosDePago) VALUES (?, ?, ?, ?, ?, 0, ?, ?)';

    // Cambiar el nombre de la variable result
    const result = await connection.promise().query(querySelect, [email, nombre, username, contraseña, domicilio, date, datosPago]);
    
    connection.end(); // Liberar recursos BD
    connection.destroy();

    // Devolver la respuesta exitosa
    res.status(200).json({ mensaje: 'Cliente creado correctamente' });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
});

app.put('/editarcliente', async (req, res) => {
  try {
    const connection = await abrirConexion();
    const { email, nombre, date, username, contraseña, domicilio, datosPago } = req.body;
    const querySelect = 'UPDATE CLIENTES SET Nombre=?, Username=?, Contrasenia=?, Domicilio=?, FechaNacimiento=?, DatosDePago=? WHERE IdCliente=?';

    // Cambiar el nombre de la variable result
    const result = await connection.promise().query(querySelect, [nombre, username, contraseña, domicilio, date, datosPago, email]);
    
    connection.end(); // Liberar recursos BD
    connection.destroy();

    // Devolver la respuesta exitosa
    res.status(200).json({ mensaje: 'Cliente editado correctamente' });
  } catch (error) {
    console.error('Error al editar cliente:', error);
    res.status(500).json({ error: 'Error al editar cliente' });
  }
});

app.get('/clientes', async (req, res) => { // GET Clientes
  try {
    const connection = await abrirConexion();
    const query = 'SELECT * FROM CLIENTES';
    const [resultado] = await connection.promise().query(query);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON  
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});

app.get('/clientes/:id', async (req, res) => { // GET Estudiantes
  try {
    const connection = await abrirConexion();
    const id = req.params.id;
    const queryEstudiantes = 'SELECT * FROM CLIENTES WHERE idCliente = ?';
    const [resultado] = await connection.promise().query(queryEstudiantes, [id]);
    connection.end(); // Libera recursos BD
    res.json([resultado]); // Resultado servido en HTTP formato JSON
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
});

app.delete('/borrarcliente/:id', async (req, res) => {
  try{
    const connection = await abrirConexion();
    const id = req.params.id;
    console.log("Cliente:", id);

    const query1 = 'DELETE FROM CLIENTE_ALERGENOS WHERE idCliente = ?';
    await connection.promise().query(query1, id, (err, result) => {
    if (err) {
      console.error('Error al borrar cliente-alérgeno: ' + err);
      res.status(500).json({ error: 'Error al borrar cliente-alergeno' });
      return;
    }
    res.status(201).json({ message: 'Estudiante borrado con éxito' });
    });

    const query2 = 'DELETE FROM CLIENTE_PEDIDO WHERE idCliente = ?';
    await connection.promise().query(query2, id, (err, result) => {
    if (err) {
      console.error('Error al borrar cliente-pedido: ' + err);
      return;
    }
    });

    const query3 = 'DELETE FROM CLIENTES WHERE idCliente = ?';
    await connection.promise().query(query3, id, (err, result) => {
    if (err) {
      console.error('Error al borrar cliente: ' + err);
      return;
    }

    });
    connection.end();
  } catch (error){
    console.error('Error al borrar cliente:', error);
    res.status(500).json({ error: 'Error al borrar cliente' });
  }
  console.log('Cliente eliminado con éxito en la base de datos!');
  res.status(201).json({ message: 'Cliente eliminado con éxito' });
});
  


  app.listen(5050, () => { // Inicia el servidor en el puerto 5050
    console.log('Servidor en ejecución en el puerto 5050');
  });
  