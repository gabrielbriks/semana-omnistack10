//Lembrando que o useEffect utilizamos para determinar o carregamento de algum componento em uma unica vez
import React, {useState, useEffect} from 'react';

/*imports react-native
Para utilizarmos ou melhor dizendo construirmos css para os componets
  utilizamos a importação StyleSheet
Para utilizarmos imagens em nosso projeto, importamos a lib Image
TouchableOpacity: E um botão em que poder realizar uma personalizada
*/
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';

/*importando lib Mapas,Marker
    Marker: é a marcação dentro do mapa;
    Collout: tudo que colocarmos dentro dele, ira aparecer quando clicarmos no marker do nosso mapa
*/
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
/* ??requestPermissionsAsync & ??^getCurrentPositionAsync
    requestPermissionsAsync: basicamente isso vai pedir para o nosso usuario as permissoes 
    necessarias para conseguirmo utilizar  localização do mesmo;
    getCurrentPositionAsync: Esse cara que vai pegar a localização do usuario;

*/

//Importando Icons; Pode-se pesquisar sobre esse lib no google
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';//importando nossa api

//Criando componente
//A propiedade navigation, vem de forma automatica para todas as paginas da nossa aplicação
function Main({ navigation }){ // desestruturando para conseguir pegar uma propiedade unica
    //criando estado que irá armazenar os devs da busca do app
    const [devs, setDevs] = useState([]);

    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        //Ira carergar a posição inicial no mapa
        async function loadInitialPosition(){
            {/* Propiedades do 'requestPermissionsAsync'
                granted: retorna um valor Boleano; 
                canAskAgain: se posso pedir a localização novamente para o user;
                expires: quando que essa permissão expira;
                status: status da permissão
                android: se o S.O é Android
                ios: Se o S.O é iOS
            
            */}
           const { granted } = await requestPermissionsAsync();
           
           if(granted){
               const location = await getCurrentPositionAsync({
                /* Para usar o gps do celular e conseguir uma localização mais exata, */
                   enableHighAccuracy: true,
               });

               const { latitude, longitude } = location.coords;
               setCurrentRegion({
                latitude,
                longitude,
                latitudeDelta: 0.04,  // Calculos navais para conseguir o zoom dentro do mapa
                longitudeDelta: 0.04, // Calculos navais para conseguir o zoom dentro do mapa
                
               });

           }
        }
        loadInitialPosition();
    },[]);      

    async function loadDevs(){
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params:{
                latitude,
                longitude,
                techs: 'ReactJS'
            }
        });
        console.log(response.data.devs);
        setDevs(response.data.devs);
    }

    /*Função que irá atualizar a localização State, quando o usuario mexer no mapa,
        Recebe uma region automaticamente atravez da propiedade 'onRegionChangeComplete'
    */
    function handleRegionChanged(region){
        //  console.log(region)
        setCurrentRegion(region);
    }

    if(!currentRegion){
        return null;
    }
    return(
        <>
            <MapView 
                onRegionChangeComplete={handleRegionChanged}
                initialRegion={currentRegion}
                style={styles.map}
            >
          {devs.map(dev =>(
                <Marker 
                    key={dev._id}
                    coordinate=
                    {{
                        longitude: dev.location.coordinates[0],
                        latitude: dev.location.coordinates[1] //pegando latitude, que esta na segunda posicao
                    }}
                >

                <Image 
                    style={styles.avatar}
                    source={{ uri: dev.avatar_url}}
                /> 
                <Callout onPress={() => {
                    //navegação para a page perfil
                    navigation.navigate('Profile', { github_username: dev.github_username });
                }} > 
                    <View style={styles.callout}>
                        <Text style={styles.devName}>{dev.name}</Text>
                        <Text style={styles.devBio}>{dev.bio}</Text>
                        <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                    </View>
                </Callout>
             </Marker>
          ))}
         </MapView>
         <View style={styles.searchForm}>
            <TextInput 
                style={styles.searchInput} 
                placeholder ="Buscar devs por techs..."
                placeholderTextColor="#999"
                autoCapitalize="words" // colocar a primeira letra de cada palavra em caixa alta
                autoCorrect = {false} // para nao corrigir o texto digitado de uma forma padrao
            />

            <TouchableOpacity  onPress={loadDevs} style={styles.loadButton}>
                <MaterialIcons name="my-location" size={20} color="#fff"/>
            </TouchableOpacity>
         </View>
        </>
    );
    
}

//utilizando a lib importada, para novo style.
const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    avatar:{
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff',

    },
    callout:{
        width:260,        
    },
    devName:{
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs:{
        marginTop: 5,
    },
    searchForm:{
        position:'absolute',
        top: 20,//trocando prop 'button' para 'top', ate configurar o teclado 
        left: 20,
        right: 20,
        zIndex: 5, // Para forçar que ele fique por cima do mapa
        flexDirection: 'row',

    },
    searchInput:{
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        // Aplicando Sobra iOS
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            width: 4,
            height: 4,
        },
        // End - Aplicando Sobra iOS
        elevation: 2,
    },
    loadButton:{
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,        

    },
});

export default Main;

/* Melhorias posteriores

Keyboard: Podemos importar essa lib, para conseguir configura
    o teclado e o input para que ao acionar o teclado, não
    fique em cima do nosso input

*/