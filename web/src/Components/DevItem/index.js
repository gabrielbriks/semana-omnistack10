import React from 'react';
import './styles.css';

function DevItem(props){
  const { dev } = props;

  return (
  <li className="dev-item">
  <header>
    <img src={dev.avatar_url} alt={dev.name} />
    <div className="user-info">
    <strong>{ dev.name }</strong>
    <span>{dev.techs.join(', ')}</span> {/*Como ele e um array, estou usando o join para separar cada item por virgula e espaço*/}
    </div>
  </header>
  <p>{dev.bio}</p>
  <a href={`http://github.com/${dev.github_username}`}>Acessar perfil GitHub</a>
  </li>
  );
}

export default DevItem;