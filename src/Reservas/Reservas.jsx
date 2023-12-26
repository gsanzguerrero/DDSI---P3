import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigate } from 'react-router-native';
import axios from 'axios';

const Reservas= () => {
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
        <Image style={styles.image} source={require('../../LogoMcAndCheese.png')} />
        <Text style={styles.title}>McAndCheese - Práctica 3</Text>
      </View>
      <Text style={styles.title}>Subsistema de Reservas</Text>

      <Pressable style={[styles.pressableButton, { alignSelf: 'center' }]} onPress={() => handleButtonClick('/')}>
        <Text style={styles.pressableText}>Volver</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 20,
    },
    image: {
      width: 200, // Ajusta el ancho según tus necesidades
      height: 200, // Ajusta la altura según tus necesidades
      borderRadius: 0,
      marginBottom: 20,
    },
    pressableButton: {
      width: 200,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: '#049CDC',  // Un verde fresco, puedes cambiarlo según tus preferencias
      borderRadius: 10,
      elevation: 3, // Sombra para un efecto de elevación
      marginBottom: 15,
      marginTop: 15,
      paddingHorizontal: 20,
      paddingVertical: 10,
    }, pressableText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold', // Texto en negrita
      textAlign: 'center',
    },
    text:{
      marginBottom: 100,
      marginTop: 100,
      fontSize: 14,
      fontWeight: 'bold'
    }
  });

export default Reservas;
