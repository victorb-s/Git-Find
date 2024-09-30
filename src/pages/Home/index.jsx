import { Header } from '../../components/Header';
import { ItemList } from '../../components/ItemList'

import background from '../../assets/background.png';
import './styles.css';

import { useState } from 'react';

const App = () => {
  const[user, setUser] = useState('');
  const[currentUser, setCurrentUser] = useState(null);
  const[repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name){
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length){
        setRepos(newRepos);
      }
    }
  }

  return (
    <div className="App">
      <Header></Header>
      <div className="conteudo">
        <img src={background} className="background" alt="background do aplicativo" />

        <div className="info">
          <div>
            <input
              name="usuario"
              placeholder="@username"
              onChange={event => setUser(event.target.value)}
              value={user}/>
            <button onClick={handleGetData}>Buscar</button>
          </div>

          {currentUser?.name ? ( <>
            <div className="perfil">
              <img src={currentUser.avatar_url}
              className="profile"
              alt="Foto do usuário" />

              <div className="perfil-dados">
                <h3>{currentUser.name}</h3>
                <span>@{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
            </div>
          
            <hr />
          </> ) : null}

          {repos?.length ? ( <>
            <div className="repositorios">
              <h2>Repositórios</h2>
              {repos.map(repo => (
                <ItemList
                  href={repo.html_url}
                  title={repo.name}
                  description={repo.description}
                />
              ))}
            </div>
          </> ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
