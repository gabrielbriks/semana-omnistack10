//Lembrando que o useEffect utilizamos para determinar o carregamento de algum componento em uma unica vez
import React, {useState, useEffect} from 'react';

/*imports react-native
Para utilizarmos ou melhor dizendo construirmos css para os componets
  utilizamos a importação StyleSheet
Para utilizarmos imagens em nosso projeto, importamos a lib Image

*/
import { StyleSheet, Image, View, Text } from 'react-native';

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

//Criando componente
//A propiedade navigation, vem de forma automatica para todas as paginas da nossa aplicação
function Main({ navigation }){ // desestruturando para conseguir pegar uma propiedade unica
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

    if(!currentRegion){
        return null;
    }
    return(
         <MapView initialRegion={currentRegion} style={styles.map}>
             <Marker coordinate={{ latitude: -15.7915298,longitude:-47.8921573 }}>

                <Image style={styles.avatar} source={{ uri: 'https://avatars3.githubusercontent.com/u/37519878?s=460&v=4'}}/> 
                <Callout onPress={() => {
                    //navegação
                    navigation.navigate('Profile', { github_username: 'gabrielbriks' });
                }} > 
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Gabriel Reis Morais</Text>
                        <Text style={styles.devBio}>Alwais learning!</Text>
                        <Text style={styles.devTechs}>.NET, C#, JavaScript, ReactJS</Text>
                    </View>
                </Callout>
             </Marker>
         </MapView>
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
    }
});

export default Main;