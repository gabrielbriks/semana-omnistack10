import React from 'react';

//para utilizarmos ou melhor dizendo construirmos css para os componets utilizamos essa importação
import { StyleSheet } from 'react-native';

//importando lib Mapas
import MapView from 'react-native-maps';

//Criando componente
function Main(){
                        {/* Pq duas chaves? Pq o style ja necessita ter chave, e para declarar o
                            proprio css que é, e deve ser um objeto, tambem precisa de chaves,
                        por essa razao temos duas chaves  */}
    return <MapView  style={{flex:1}}/>
}

//utilizando a lib importada, para novo style.
const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});

export default Main;