import React, {useState, useEffect} from 'react';
import './styles.css';

function DevForm({onSubmit}){

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
  }, []);

  async function handleSubmit(e){
    e.preventDefault();

    await onSubmit({
        github_username,
        techs,
        latitude,
        longitude  
    });

    //Limpando os campos da tela de cadastro
    setGitHubUsername('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
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
  );
}


export default DevForm;