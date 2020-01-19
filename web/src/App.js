import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css'

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
  
  //criandao estado para ser setado os valores da geoLocation em nosso inputs de Localização
  const [ github_username, setGitHubUsername ] = useState('');
  const [ techs, setTechs ] = useState('');
  
  const [ latitude, setLatitude ] = useState('');
  const [ longitude, setLongitude ] = useState('');
  
  // Busca localização do user
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //funcao de sucesso, retorna a position  do user
        //  console.log(position.coords);
        const { latitude, longitude} = position.coords;
        
        // console.log(latitude);

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout:30000,
      }
    )
  }, [latitude, longitude, setLatitude, setLongitude]);
    
  //Funcao que ira disparar evento salvar ao clicar no submit
  async function handleAddDev(e){
    //Como ele possui um comportamento padrao de levar para outra tela utilizamos o preventDefault
    e.preventDefault();
    
    //POST - Cadastrar Dev
    const response = await api.post('/devs',{
      github_username,
      techs,
      latitude,
      longitude
    });
    console.log(response.data);
  }

  return (
   <div id="app">
     <aside>
      <strong>Cadastrar</strong>
      <form onSubmit={handleAddDev}>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do GirHub</label>
          <input 
          name="github_username" 
          id="github_username" 
          required 
          value = {github_username}
          onChange = { e => setGitHubUsername(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input
            name="techs" 
            id="techs" 
            required 
            value = {techs}
            onChange={e => setTechs(e.target.value)}
          />
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input 
              type="number"
              name="latitude" 
              id="latitude" 
              required 
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input 
              type="number"
              name="longitude"
              id="longitude"
              required 
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
            />
          </div>
        </div>

        <button type="submit">Salvar</button>
      </form>
     </aside>

     <main>
      
      <ul>
        <li className="dev-item">
          <header>
            <img src="https://avatars3.githubusercontent.com/u/37519878?s=400&u=92a1bf6f06e6729873b86fd21af8c6c29f71c979&v=4" alt="Avatar"/>
            <div className="user-info">
              <strong>Gabriel Briks</strong>
              <span>JavaScript, C#, ReactJS</span>
            </div>
          </header>
          <p>Desenvolvedor C# e Javascript em grande construção...</p>
          <a href="http://github.com/gabrielbriks">Acessar perfil GitHub</a>
        </li>

        <li className="dev-item">
          <header>
            <img src="https://avatars3.githubusercontent.com/u/37519878?s=400&u=92a1bf6f06e6729873b86fd21af8c6c29f71c979&v=4" alt="Avatar"/>
            <div className="user-info">
              <strong>Gabriel Briks</strong>
              <span>JavaScript, C#, ReactJS</span>
            </div>
          </header>
          <p>Desenvolvedor C# e Javascript em grande construção...</p>
          <a href="http://github.com/gabrielbriks">Acessar perfil GitHub</a>
        </li>

        <li className="dev-item">
          <header>
            <img src="https://avatars3.githubusercontent.com/u/37519878?s=400&u=92a1bf6f06e6729873b86fd21af8c6c29f71c979&v=4" alt="Avatar"/>
            <div className="user-info">
              <strong>Gabriel Briks</strong>
              <span>JavaScript, C#, ReactJS</span>
            </div>
          </header>
          <p>Desenvolvedor C# e Javascript em grande construção...</p>
          <a href="http://github.com/gabrielbriks">Acessar perfil GitHub</a>
        </li>

        <li className="dev-item">
          <header>
            <img src="https://avatars3.githubusercontent.com/u/37519878?s=400&u=92a1bf6f06e6729873b86fd21af8c6c29f71c979&v=4" alt="Avatar"/>
            <div className="user-info">
              <strong>Gabriel Briks</strong>
              <span>JavaScript, C#, ReactJS</span>
            </div>
          </header>
          <p>Desenvolvedor C# e Javascript em grande construção...</p>
          <a href="http://github.com/gabrielbriks">Acessar perfil GitHub</a>
        </li>
      </ul>

     </main>
   </div>
  );
}

export default App;
