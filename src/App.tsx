import React from 'react';
import logo from './logo.svg';
import './App.css';
import useFetchTopMangas from './services/Requests/useFetchTopMangas';

function App() {
  const { data } = useFetchTopMangas();

  console.log(data);
  
  return (
    <div className="App">
      {
        data?.top.map((manga) => (
          <div key={`Manga-${manga.mal_id}`} className="MangaItem">
            <img src={manga.image_url} />
            {manga.title}
          </div>
        ))
      }
    </div>
  );
}

export default App;
