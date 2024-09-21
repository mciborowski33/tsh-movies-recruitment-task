import { Request, Response } from 'express';

import db from 'db';
import { checkGenre, countMatchingItems } from 'utils';

type RequestQuery = {
  duration?: number;
  genres?: string[];
};

const getMovies = (req: Request<unknown, unknown, unknown, RequestQuery>, res: Response) => {
  const { duration, genres } = req.query;
  const { movies } = db;

  let filteredMovies = [...movies];
  let pickRandomMovie = true;

  if (genres && !checkGenre(genres)) {
    res.status(422).json('Invalid genres data.');
    return;
  } else if (genres) {
    pickRandomMovie = false;
    filteredMovies = filteredMovies
      .filter(({ genres: movieGenres }) => movieGenres.some((genre) => genres.includes(genre)))
      .sort(({ genres: genresA }, { genres: genresB }) => {
        return countMatchingItems(genresB, genres) - countMatchingItems(genresA, genres);
      });
  }

  if (duration) {
    filteredMovies = filteredMovies.filter(
      ({ runtime }) => runtime >= duration - 10 && runtime <= duration + 10,
    );
  }

  if (pickRandomMovie) {
    const randomMovie = filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
    res.status(200).json(randomMovie);
  } else {
    res.status(200).json(filteredMovies);
  }
};

export default getMovies;
