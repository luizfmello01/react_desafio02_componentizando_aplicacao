import { useEffect, useState } from "react";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";

// Import interfaces
import { IGenreResponse } from "../interfaces/IGenreResponse";
import { IMovie } from "../interfaces/IMovie";

interface ContentProps {
  selectedGenreId: number
}

export function Content(props: ContentProps) {
  // Complete aqui

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<IGenreResponse>({} as IGenreResponse);

  useEffect(() => {
    api.get<IMovie[]>(`movies/?Genre_id=${props.selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<IGenreResponse>(`genres/${props.selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [props.selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  );
}