import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import Routes from './src/routes'

// console.ignoredYellowBox = true;
YellowBox.ignoreWarnings([
  'Unrecognized WebCocket connection',
]);

export default function App() {
 
  return (
    /* Aqui no React não possuí herança de estilização, nesse caso 
      para utilizarmos uma estilização que esta na tag pai, deveremos
      aplicar também na tag filho.
    */
   <>
   <StatusBar barStyle="ligth-content" backgroundColor="#7b40e7"/>
   <Routes />
   </>
  );
}

