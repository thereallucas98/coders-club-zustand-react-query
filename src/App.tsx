import React, { useCallback, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import useFetchTopMangas from "./services/Requests/useFetchTopMangas";
import { useFavoriteMangas } from "./store/useFavoriteMangas";

function App() {
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const { data } = useFetchTopMangas();
  const { favorites, favoritateManga } = useFavoriteMangas();

  const toggleShowOnlyFavorite = useCallback(() => {
    setShowOnlyFavorites((prevShowOnlyFavorites) => !prevShowOnlyFavorites);
  }, []);

  return (
    <div className="App">
      <button onClick={toggleShowOnlyFavorite} className="show-favorite-button">
        Show Favorites
      </button>
      <div className="manga-list">
        {data?.top
          .filter(
            (manga) => !showOnlyFavorites || favorites?.includes(manga.mal_id)
          )
          .map((manga) => (
            <div key={`Manga-${manga.mal_id}`} className="MangaItem">
              <img src={manga.image_url} />
              {manga.title}
              <button onClick={() => favoritateManga(manga.mal_id)}>
                {favorites?.includes(manga.mal_id) ? "*" : ""} Favoritar
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
