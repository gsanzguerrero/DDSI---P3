import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigate } from 'react-router-native';
import axios from 'axios';

const VerStock = () => {
  const [stockData, setStockData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Llamada a la API al cargar el componente
      const fetchData = async() => {
        try{
          const response = await axios.get('http://172.28.152.110:5050/ver');
          const resultado = response.data[0];
          await setStockData(resultado);
        } catch(error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };
    fetchData();
  }, []);

  const handleButtonClick = (enlace) => {
    navigate(enlace);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={require('../LogoMcAndCheese.png')} />
        <Text style={styles.title}>McAndCheese - Seminario 2</Text>
      </View>
      <Text style={styles.text}>La tabla STOCK tiene la siguiente información: </Text>

      {stockData.length > 0 ? (
        <>
          <View style={styles.tableRow}>
            <Text style={styles.tableTitle}>ID Producto</Text>
            <Text style={styles.tableTitle}>Cantidad</Text>
          </View>
          {stockData.map((item) => (
            <View key={item.Cproducto} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.Cproducto}</Text>
              <Text style={styles.tableCell}>{item.Cantidad}</Text>
            </View>
          ))}
        </>
      ) : (
        <Text style={styles.text}>No hay datos disponibles</Text>
      )}

      <Pressable style={[styles.pressableButton, { alignSelf: 'center' }]} onPress={() => handleButtonClick('/')}>
        <Text style={styles.pressableText}>Volver</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    alignSelf: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 5,
    alignSelf: 'center',
    marginTop: 10
  },
  tableCell: {
    fontSize: 16,
    marginRight: 50,
    marginLeft:50
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    marginLeft:10
  },
  pressableButton: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#049CDC',
    borderRadius: 10,
    elevation: 3,
    marginBottom: 15,
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pressableText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default VerStock;
