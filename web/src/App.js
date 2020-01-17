import React from 'react';
/* Os tres conceitos do React
  1#Componente
    * O componente nesse inicio já estamos utilizando 
      que é o nosso app. 
    * Ele basicamente é uma function que retorna um 
      conteudo html, css ou ate mesmo js.
    * O conceito de criar um componente novo parte de 
      quando estamos repetindo um trecho de codigo muitas 
      vezes tipo 3 vezes ou mais, ou também quando conseguimos
      insolar um pedaço da nossa aplicação. Ex: um cabeçalho, uma timeline 
    *RESUMINDO:
      O Componente é um Bloco isolado de HTML, CSS e JS o qual nao interfere 
      no restante da aplicação

  2# Propiedade
    * Sempre que usamos o HTMl usamos a propiedade
    * Um exemplo de propiedade é atribuir por exemplao nosso Header a propiedade ' title="Dashboard" ' 
    RESUMO:
      Propiedade nada mais é do que Informações um componente PAI passa para um componente FILHO
  3#Estado
    * é basicamenteuma informação que um componente vai manipular
    
  
  
*/

import Header from './Header';
/*definicao de App
  é uma função que retorna um conteudo html;
  o conteudo html e o que chamamos de JSX
*/
function App() {
  return (
    <>
    <Header title="Dashboard"/>
    <Header title="Titulo 2"/>
    <Header title="Titulo 3"/>
    </>
  // <h1>Hello World</h1>
  );
}

export default App;
