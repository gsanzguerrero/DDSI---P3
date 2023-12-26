// App.js

import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import {useNavigate} from 'react-router-native'
import axios from 'axios';

const App = () => {

  const navigate = useNavigate();

    const handleButtonClick = (enlace) => {
        navigate(enlace);
    };

    const reiniciarBD = () => {
      axios.post('http://172.28.152.110:5050/reiniciar')
      .then((response) => {
        // Maneja la respuesta exitosa
        navigate('/mensaje', { state: { mensaje: '¡Base de datos reiniciada con éxito!' } });
    })
    .catch((error) => {
        // Maneja los errores
        navigate('/mensaje', { state: { mensaje: 'Error al reiniciar la base de datos: ', error } });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={require('../LogoMcAndCheese.png')} />
        <Text style={styles.title}>McAndCheese - Seminario 2</Text>
      </View>
      <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/añade')}>
          <Text style={styles.pressableText}>Añadir Stock</Text>
      </Pressable>  
      <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/resta')}>
          <Text style={styles.pressableText}>Restar Stock</Text>
      </Pressable>
      <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/ver')}>
          <Text style={styles.pressableText}>Ver Stock</Text>
      </Pressable>

      <Pressable style={styles.pressableButton} onPress={() => reiniciarBD()}>
          <Text style={styles.pressableText}>Reiniciar BD</Text>
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

export default App;