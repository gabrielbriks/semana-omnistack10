//Lembrando que o useEffect utilizamos para determinar o carregamento de algum componento em uma unica vez
import React, {useState, useEffect} from 'react';

//para utilizarmos ou melhor dizendo construirmos css para os componets utilizamos essa importação
import { StyleSheet } from 'react-native';

//importando lib Mapas
import MapView from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
/* ??requestPermissionsAsync & ??^getCurrentPositionAsync
    requestPermissionsAsync: basicamente isso vai pedir para o nosso usuario as permissoes 
    necessarias para conseguirmo utilizar  localização do mesmo;
    getCurrentPositionAsync: Esse cara que vai pegar a localização do usuario;

*/

//Criando componente
function Main(){
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
    return <MapView initialRegion={currentRegion} style={styles.map}/>
    //Time Video Aula >>> 55:00
}

//utilizando a lib importada, para novo style.
const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});

export default Main;