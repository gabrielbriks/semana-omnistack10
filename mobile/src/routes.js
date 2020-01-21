import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';

//importando as nossas paginas
import Main from './pages/Main';
import Profile from './pages/Profile';

/*Mesma abordagem que possuí no docs expo Guide de 'Hello Navigation' 
Link: https://reactnavigation.org/docs/en/hello-react-navigation.html
*/
const Routes = createAppContainer(
    createStackNavigator({
        // Objetos com as rotas da nossa aplicação;
        Main:{
            //qual componente que sera renderizado
            screen: Main,
            navigationOptions:{
                title: 'Dev Radar'
            }
        },
        Profile:{
            screen: Profile,
            navigationOptions:{
                title: 'Perfil no GitHub'
            }
        },
    })
);



export default Routes;