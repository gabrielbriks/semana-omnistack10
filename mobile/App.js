import React from 'react';

import Routes from './src/routes'

export default function App() {
  return (
    /* Aqui no React não possuí herança de estilização, nesse caso 
      para utilizarmos uma estilização que esta na tag pai, deveremos
      aplicar também na tag filho.
    */
   <Routes />
  );
}

