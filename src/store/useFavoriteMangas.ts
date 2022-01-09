import create from "zustand";
import { persist } from "zustand/middleware"; 

type State = {
  favorites?: number[];
  favoritateManga: (id: number) => void;
}

export const useFavoriteMangas = create<State>(
  persist(
    (set, get) =>
      ({
        favorites: [],
        favoritateManga: (id: number) => {
          const favorites = get().favorites;
          const shouldFavorite = !favorites?.includes(id);
          
          if (shouldFavorite) {
            if (favorites) {
              useFavoriteMangas.setState({ favorites: [...favorites, id] });
            } else {
              useFavoriteMangas.setState({ favorites: [id] });
            }
          } else {
            useFavoriteMangas.setState({
              favorites: favorites?.filter((mangaId) => mangaId !== id),
            });
          }
        }
      } as State),
    {
      name: 'useFavoriteMangas',
    }
  )
);