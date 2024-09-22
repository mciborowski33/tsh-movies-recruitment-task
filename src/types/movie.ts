export interface MovieData {
  title: string;
  year: number;
  runtime: number;
  director: string;
  genres: string[];
  actors?: string;
  plot?: string;
  posterUrl?: string;
}

export interface Movie extends MovieData {
  id: number;
}
