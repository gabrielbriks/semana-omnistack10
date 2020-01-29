import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css'

import DeForm from './Components/DevForm';
import DevItem from './Components/DevItem';

/* Anotações Gerais
  # UseEfect()
    Ele serve para dispararmos uma função toda vez que uma informação for alterada,
    ou também apenas uma unica vez. Ele recebe 2 parametros, o primeiro falamos para
    ele qual vai ser a função que ele irá executar, e o segundo dizemos QUANDO ele ira
    executar.

    No segundo parametro dexaremos um vetor vazio, pois se ele estiver vazio ela irá executar
    apena uma unica vez.
  #



*/

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
  //create state for list the devs
  const [devs, setDevs] = useState([]);
  
  //Busca lista de usuarios
  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');     
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  //Funcao que ira disparar evento salvar ao clicar no submit
  async function handleAddDev(data){   
    //POST - Cadastrar Dev
    const response = await api.post('/devs', data);
    //inserir o ultimo dev cadastrado na listagem de apresentação
    setDevs([...devs, response.data]);
  }

  return (
   <div id="app">
     <aside>
      <strong>Cadastrar</strong>
      <DeForm onSubmit={handleAddDev} />
     </aside>

     <main>
      <ul>
        {/* Percorrendo o meu vetor devs, e irá retornar um conteudo JSX(HTML) */}
        {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          )
        )}       
      </ul>
    
     </main>
   </div>
  );
}

export default App;
