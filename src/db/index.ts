import fs from 'fs';

import { DB_FILE_PATH } from 'config';
import { DB } from 'types/db';
import { Movie, MovieData } from 'types/movie';

const db: DB = {
  genres: [],
  movies: [],
};

/*
Note: db.json file contains runtimes and years data in string format, 
while task defines them as numbers. In order to keep coherent json schema 
and fulfill the task, I've decided to convert those values to numbers 
on import, and save them as strings while updating the file.
*/

export const initialize = () => {
  const dbObject = JSON.parse(fs.readFileSync(DB_FILE_PATH, 'utf8'));
  const { genres, movies } = dbObject;
  db.genres = genres;
  db.movies = (movies as Movie[]).map(({ year, runtime, ...rest }) => {
    return {
      year: Number(year),
      runtime: Number(runtime),
      ...rest,
    };
  });
};

export const updateDB = (newMovie: MovieData) => {
  const { movies, genres } = db;

  try {
    const id = movies.length + 1;
    movies.push({ id, ...newMovie });

    const dbToSave = {
      genres,
      movies: movies.map(({ year, runtime, ...rest }) => {
        return { year: String(year), runtime: String(runtime), ...rest };
      }),
    };

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(dbToSave, null, 2), 'utf8');
    return id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`DB Write Error: ${error.message}`);
  }
};

export default db;
