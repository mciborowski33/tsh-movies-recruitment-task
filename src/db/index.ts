import fs from 'fs';

import { DB } from 'types/db';
import { Movie } from 'types/movie';

const DB_FILE_PATH = `${__dirname}/db.json`;

const db: DB = {
  genres: [],
  movies: [],
};

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

export const updateDB = () => {
  try {
    const dbToSave = {
      genres: db.genres,
      movies: db.movies.map(({ year, runtime, ...rest }) => {
        return { year: String(year), runtime: String(runtime), ...rest };
      }),
    };

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(dbToSave, null, 2), 'utf8');
  } catch (error: any) {
    throw new Error(`DB Write Error: ${error.message}`);
  }
};

export default db;
