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
  host: "172.28.152.110",
  user: "root",
  password: "sem2",
  database: "seminario2",
  port: "3306"
};

async function abrirConexion(){
  const connection = await mysql.createConnection(dbConfig);
  return connection;
} 

app.get('/ver', async (req, res) => { // GET Usuarios
  try {
      const connection = await abrirConexion();
      const queryUsuarios = 'SELECT * FROM STOCK';
      const [resultado] = await connection.promise().query(queryUsuarios);
      connection.end(); // Libera recursos BD
      connection.destroy();
      res.json([resultado]); // Resultado servido en HTTP formato JSON
    } catch (error) {
      console.error('Error al obtener datos:', error);
      res.status(500).json({ error: 'Error al obtener datos' });
    }

  });

  app.post('/aniadir', async (req, res) => {
    try {
      const connection = await abrirConexion();
      const { Cproducto, cantidad } = req.body;
  
      // Convertir la cantidad a un número
      const cantidadNumerica = parseInt(cantidad);
  
      // Obtener el stock actual
      const querySelect = 'SELECT Cantidad FROM STOCK WHERE Cproducto = ?';
      const [stockAnterior] = await connection.promise().query(querySelect, [Cproducto]);
  
      if (stockAnterior.length === 0) {
        // Si no se encuentra el producto en el stock, devolver un error
        return res.status(404).json({ error: 'Error al restar el stock: producto no encontrado en el stock' });
      }
  
      const stockAnteriorCantidad = stockAnterior[0].Cantidad;
  
      // Calcular el nuevo stock
      const nuevoStock = stockAnteriorCantidad + cantidadNumerica;
  
      const queryUpdate = 'UPDATE STOCK SET Cantidad = ? WHERE Cproducto = ?';
      await connection.promise().query(queryUpdate, [nuevoStock, Cproducto]);
  
      connection.end(); // Liberar recursos BD
      connection.destroy();
  
      // Devolver la respuesta exitosa
      res.status(200).json({ mensaje: 'Stock actualizado correctamente' });
    } catch (error) {
      console.error('Error al sumar stock:', error);
      res.status(500).json({ error: 'Error al sumar stock' });
    }
  });

  app.post('/reiniciar', async (req, res) => {
    try {
      const connection = await abrirConexion();
  
      // Sentencias SQL para reiniciar la tabla STOCK
      const sqlStatements = [
        'DROP TABLE IF EXISTS STOCK;',
        'CREATE TABLE IF NOT EXISTS STOCK (Cproducto int, Cantidad int CHECK (Cantidad >= 0), primary key(Cproducto));',
        'INSERT IGNORE INTO STOCK(Cproducto, Cantidad) VALUES(1,5);',
        'INSERT IGNORE INTO STOCK(Cproducto, Cantidad) VALUES(2,5);',
        'INSERT IGNORE INTO STOCK(Cproducto, Cantidad) VALUES(3,5);',
        'INSERT IGNORE INTO STOCK(Cproducto, Cantidad) VALUES(4,5);',
        'INSERT IGNORE INTO STOCK(Cproducto, Cantidad) VALUES(5,5);',
        'INSERT IGNORE INTO STOCK(Cproducto, Cantidad) VALUES(6,5);',
        'INSERT IGNORE INTO STOCK(Cproducto, Cantidad) VALUES(7,5);',
        'INSERT IGNORE INTO STOCK(Cproducto, Cantidad) VALUES(8,5);',
        'INSERT IGNORE INTO STOCK(Cproducto, Cantidad) VALUES(9,5);',
        'INSERT IGNORE INTO STOCK(Cproducto, Cantidad) VALUES(10,5);'
      ];
  
      // Ejecutar las sentencias SQL
      for (const sqlStatement of sqlStatements) {
        await connection.promise().query(sqlStatement);
      }
  
      connection.end(); // Liberar recursos BD
      connection.destroy();
  
      // Devolver la respuesta exitosa
      res.status(200).json({ mensaje: 'Tabla STOCK reiniciada correctamente' });
    } catch (error) {
      console.error('Error al reiniciar la tabla STOCK:', error);
      res.status(500).json({ error: 'Error al reiniciar la tabla STOCK' });
    }
  });
  
  

  app.post('/restar', async (req, res) => {
    try {
      const connection = await abrirConexion();
      const { Cproducto, cantidad } = req.body;
  
      // Obtener el stock actual
      const querySelect = 'SELECT Cantidad FROM STOCK WHERE Cproducto = ?';
      const [stockAnterior] = await connection.promise().query(querySelect, [Cproducto]);
  
      if (stockAnterior.length === 0) {
        // Si no se encuentra el producto en el stock, devolver un error
        return res.status(404).json({ error: 'Error al restar el stock: producto no encontrado en el stock' });
      }
  
      const stockAnteriorCantidad = stockAnterior[0].Cantidad;
  
      // Calcular el nuevo stock
      const nuevoStock = stockAnteriorCantidad - cantidad;
  
      if (nuevoStock < 0) {
        // Si el nuevo stock es negativo, devolver un error
        return res.status(400).json({ error: 'Error al restar el stock: ¡El stock no puede ser menor de 0!' });
      }
  
      // Actualizar el stock en la base de datos
      const queryUpdate = 'UPDATE STOCK SET Cantidad = ? WHERE Cproducto = ?';
      await connection.promise().query(queryUpdate, [nuevoStock, Cproducto]);
  
      connection.end(); // Liberar recursos BD
      connection.destroy();
  
      // Devolver la respuesta exitosa
      res.status(200).json({ mensaje: 'Stock actualizado correctamente' });
    } catch (error) {
      console.error('Error al restar stock:', error);
      res.status(500).json({ error: 'Error al restar stock' });
    }
  });
  


  app.listen(5050, () => { // Inicia el servidor en el puerto 5050
    console.log('Servidor en ejecución en el puerto 5050');
  });
  