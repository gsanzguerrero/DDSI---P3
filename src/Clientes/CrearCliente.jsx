import {  Image, Platform, Pressable , StyleSheet, Text, View} from 'react-native'
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import { useNavigate } from 'react-router-native';
import {useState} from 'react'


const useHost = () => {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:5050';
    } else {
      return 'http://localhost:5050';
    }
};

const CrearCliente = ()=>{
    const navigate = useNavigate();
        const handleButtonClick = (enlace) => {
        
        navigate(enlace);
    };

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [username, setUsername] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [datosPago, setDatosPago] = useState('');
    const [hidePass, setHidePass] = useState(true);
    /* Diferencia entre fechas debido a que en BD se introduce cómo string */
    const [date, setDate] = useState('');

    const onChange = (event, selectedDate) => {
        setShowDate(false);
        setDate(selectedDate);
        setbdDate((date.toISOString().split('T')[0]));
    };

    const showDatePicker = () => {
        setShowDate(true);
    }



    const handleCreateCliente = () => {

        if (!date) {
            // Maneja el error de fecha no seleccionada
            return;
        }
        // Realiza una solicitud POST al servidor backend para crear un alumno
        axios.post(`${useHost()}/crearcliente`, {
            email, 
            nombre, 
            date,
            username,
            contraseña,
            domicilio,
            datosPago
        })
        .then((response) => {
            // Maneja la respuesta exitosa
            navigate('/clientes');
        })
        .catch((error) => {
            // Maneja los errores
            console.error("Error al crear cliente: ",error);
            navigate('/mensaje', { state: { mensaje: 'Error en la creación del cliente',error } });
        });
        
    };

    return(
        <View>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.image} source={require('../../LogoMcAndCheese.png')} />
                    <Text style={styles.title}>McAndCheese - Práctica 3</Text>
                </View>
            </View>
            <Text style={styles.titleText}>Subsistema de Clientes</Text>
            <Text style={styles.titleText}>Crear un Nuevo Cliente</Text>
            
            <Text style={styles.text}>Email:</Text>
            <TextInput style={styles.textInput}
                label="email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Text style={styles.text}>Nombre y apellidos:</Text>
            <TextInput style={styles.textInput}
                label="Nombre y apellidos"
                value={nombre}
                onChangeText={text => setNombre(text)}
            />

            <Text style={styles.text}>Fecha de nacimiento:</Text>
            <TextInput style={styles.textInput}
                label="Fecha de nacimiento"
                value={date}
                onChangeText={text => setDate(text)}
            />

            <Text style={styles.text}>Nombre de usuario: </Text>
            <TextInput style={styles.textInput}
            label="Nombre de usuario"
            value={username}
            onChangeText={text => setUsername(text)}
            />

            <Text style={styles.text}>Contraseña: </Text>
            <TextInput style={styles.textInput}
            label="Contraseña"
            secureTextEntry={hidePass}
            value={contraseña}
            onChangeText={text => setContraseña(text)}
            right={<TextInput.Icon icon="eye" onPress={() => setHidePass(!hidePass)} />}
            />

            <Text style={styles.text}>Domicilio: </Text>
            <TextInput style={styles.textInput}
            label="Domicilio"
            value={domicilio}
            onChangeText={text => setDomicilio(text)}
            />

            <Text style={styles.text}>Datos de pago: </Text>
            <TextInput style={styles.textInput}
            label="Nº de cuenta"
            value={datosPago}
            onChangeText={text => setDatosPago(text)}
            />
            <View style={styles.button}>
                <Pressable style={styles.pressableButton} onPress={handleCreateCliente}>
                    <Text style={styles.pressableText}>Crear Cliente</Text>
                </Pressable> 
            </View>

            <View style={styles.button}>
                <Pressable style={styles.pressableButton} onPress={() => handleButtonClick('/clientes')}>
                    <Text style={styles.pressableText}>Volver atrás</Text>
                </Pressable> 
            </View>
            
        </View>
        
    )
}

const styles=StyleSheet.create({
    image: {
        width: 200, // Ajusta el ancho según tus necesidades
        height: 200, // Ajusta la altura según tus necesidades
        borderRadius: 0,
        marginBottom: 20,
      },
    text:{
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center', 
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    titleText:{
        flex: 1,
        justifyContent: 'center', // Centra horizontalmente
        textAlign: 'center', 
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    textInput:{
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#999',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 5,
        marginBottom: 5,
        width: 500,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    mensajeError: {
        fontSize: 16,
        color: 'red', // Puedes cambiar el color a tu preferencia
        textAlign: 'center',
        marginTop: 10,
    },mensajeExito: {
        fontSize: 16,
        color: 'black', // Puedes cambiar el color a tu preferencia
        textAlign: 'center',
        marginTop: 10,
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
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',  // Un tono de gris oscuro, puedes ajustarlo según tus preferencias
        marginTop: 20,
        marginBottom: 10,
    },
    pressableText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold', // Texto en negrita
        textAlign: 'center',
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
      }
})




export default CrearCliente