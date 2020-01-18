import React, { useState } from 'react';

import './global.css';
import './App.css';
import './Sidebar.css';



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
    * O React nao fica monitorando as alterações de variaveis, por isso ao implentar o contador
      na funcionou, para funcionar de forma correta devemos utilizar esse conceito de estado.
      Utilizamos esse conceito importando a lib 'useState';
        Ex. de utilização: ' const counte = useState(0); ' , o valor do paramtro e o valor inicial
    * O retorno do useState é um vetor que dentro dele contem: a 'var count' e uma funcao setCounte,
      que usamos para atualizar o valor do proprio 'counter'
    * O comportamento desse 'setCounter' segue o conceito de imutabilidade, que nesse caso quer dizer
      que nao é atribuido um valor para a 'var counter', a cada atualização o 'setCounter' cria um
      novo counter com o novo valor, sempre dentro do react sera assim, "criará um novo counter".
    RESUMO:
      São informações mantidas pelo componente (Lembrar: imutabilidade)
*/

/*definicao de App
  é uma função que retorna um conteudo html;
  o conteudo html e o que chamamos de JSX
*/
function App() {//Componente PAI

  return (
   <div id="app">
     <aside>
      <strong>Cadastrar</strong>
      <form>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do GirHub</label>
          <input name="github_username" id="github_username" required />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input name="techs" id="techs" required />
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input name="latitude" id="latitude" required />
          </div>

          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input name="longitude" id="longitude" required />
          </div>
        </div>

        <button type="submit">Salvar</button>
      </form>
     </aside>
     <main>

     </main>
   </div>
  );
}

export default App;
