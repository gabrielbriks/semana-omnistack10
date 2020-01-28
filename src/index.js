/* import react
    Importamos o React em todos os arquivos que irá utilizar HTML dentro dele.
    O que chamamos de html ? 
    Ex: a tag ' <App /> ' é uma tag JSX (que equivale em >> JS + XML) para entender melhor,
    subistituimos o XML por HTML pois o xml é a sintax do HTML; JSX = (JS + HTML);
*/
import React from 'react';
/*import ReactDOM
    O ReactDom da a possibilidade de se comunicar com a arvore de elementos da 
    nossa aplicação como o html.
*/
import ReactDOM from 'react-dom';
/*import App
    é a importação do arquivo criado em nossa propria aplicação..
*/
import App from './App';

/*
    Pegando o ReactDom e mandando ele renderizar ou podemos dizer que ele 
    ta pegando o nosso arquivo App(conteudo de HTML) para renderizar la dentro
    da nossa div 'root'.
*/
ReactDOM.render(<App />, document.getElementById('root'));

