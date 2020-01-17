import React from 'react';

/*criando componente Header; Lembrete:COMEÇA COM LETRA MAIUSCULA
    *A 'props' são todas as propiedades passadas para esse componente

*/

function Header(props){
    return <h1>{props.title}</h1>
  }


export default Header