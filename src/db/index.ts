import fs from 'fs';

import { DB } from 'types/db';

const DB_FILE_PATH = `${__dirname}/db.json`;

const db: DB = {
  genres: [],
  movies: [],
};

export const initialize = () => {
  const dbObject = JSON.parse(fs.readFileSync(DB_FILE_PATH, 'utf8'));
  const { genres, movies } = dbObject;
  db.genres = genres;
  db.movies = movies;
};

export const updateDB = () => {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(db, null, 2), 'utf8');
  } catch (error: any) {
    throw new Error(`DB Write Error: ${error.message}`);
  }
};

export default db;
