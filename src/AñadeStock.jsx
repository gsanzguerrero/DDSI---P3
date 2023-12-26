import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image, TextInput } from 'react-native';
import {useNavigate} from 'react-router-native'
import axios from 'axios';

const AñadeStock = () => {
  const [Cproducto, setCproducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const navigate = useNavigate();

    const handleButtonClick = (enlace) => {
        navigate(enlace);
    };

  const añadirStock = () => {
    axios.post('http://172.28.152.110:5050/aniadir', {
        Cproducto,
        cantidad
      })
      .then((response) => {
        // Maneja la respuesta exitosa
        navigate('/mensaje', { state: { mensaje: '¡Stock sumado con éxito!' } });
    })
    .catch((error) => {
      const mensajeError = error.response.data.error;
      navigate('/mensaje', { state: { mensaje: mensajeError } });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={require('../LogoMcAndCheese.png')} />
        <Text style={styles.title}>McAndCheese - Seminario 2</Text>
      </View>
      <Text style={styles.text}>SUMAR STOCK </Text>
      <Text style={styles.text}>Por favor introduzca el código del producto:</Text>
      <TextInput
        style={[styles.input, { alignSelf: 'center' }]}
        placeholder="Código del producto"
        value={Cproducto}
        onChangeText={(text) => setCproducto(text)}
      />
      <Text style={styles.text}>Por favor introduzca la cantidad:</Text>
      <TextInput
        style={[styles.input, { alignSelf: 'center' }]}
        placeholder="Cantidad"
        value={cantidad}
        onChangeText={(text) => setCantidad(text)}
        keyboardType="numeric" // Para mostrar el teclado numérico
      />
      <Pressable style={[styles.pressableButton, { alignSelf: 'center' }]} onPress={añadirStock}>
        <Text style={styles.pressableText}>Añadir Stock</Text>
      </Pressable>

      <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/')}>
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
    alignSelf: 'center', // Centra el texto horizontalmente
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '40%', // Limita el ancho al 80% del contenedor
  },
  pressableButton: {
    width: 150,
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
  },
  pressableText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold', // Texto en negrita
    textAlign: 'center',
  },
});

export default AñadeStock;
