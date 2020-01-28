import React from 'react';

/* Como nao podemos utilizar a div, utilizamos 
    essa importação que equivale a div
*/
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

//Criando componente
function Profile({ navigation }){
    //pegando o parametro userGit de dentro do nosso Parametro 'navigation'
    const githubUsername = navigation.getParam('github_username');
    return <WebView style={{ flex: 1 }} source={{ uri: `https://github.com/${githubUsername}` }} />
}


export default Profile;