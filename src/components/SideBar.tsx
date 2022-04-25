import { useEffect, useState } from "react";
import { Button } from "./Button";

import { api } from "../services/api";

// Import interfaces
import { IGenreResponse } from "../interfaces/IGenreResponse";

interface SideBarProps {
  selectedGenreId: number;
  handleClickButton: Function
};

export function SideBar(props: SideBarProps) {

  const [genres, setGenres] = useState<IGenreResponse[]>([]);

  useEffect(() => {
    api.get<IGenreResponse[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => props.handleClickButton(genre.id)}
              selected={props.selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  );
}