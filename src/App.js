import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {

    api.get('repositories').then(response => setRepositories(response.data));

  }, []);

  async function handleAddRepository() {
    
    const dateNow = Date.now();

    const repository = await api.post('/repositories', {
      title: `Novo Repositório ${dateNow}`,
      url: `http://github.com/hrafaelalves/novo-repositorio-${dateNow}`,
      techs: ["ReactJS", "NodeJS", "React Native"]
    });

    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {

    const repositoryIndex = repositories.findIndex(repository => repository.id == id);
    
    repositories.splice(repositoryIndex, 1);

    const repository = await api.delete(`repositories/${id}`);

    if(repository.status == 204)
      setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => <li key={repository.id}>{repository.title} <button onClick={() => handleRemoveRepository(repository.id)}> Remover </button></li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
