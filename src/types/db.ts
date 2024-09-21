import { Movie } from './movie';

export interface DB {
  genres: string[];
  movies: Movie[];
}
