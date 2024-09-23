import fs from 'fs';

import { DB_FILE_PATH } from 'config';
import db, { initialize, updateDB } from 'db';
import { Movie } from 'types/movie';

const exampleMovie = {
  title: 'Lorem Ipsum',
  year: 2010,
  runtime: 120,
  genres: ['Action', 'Adventure'],
  director: 'Fake director',
  actors: 'Person Person',
};

describe('Data from json file should be imported and updated without errors.', () => {
  let backupDB = '';

  beforeAll(() => {
    initialize();
    backupDB = fs.readFileSync(DB_FILE_PATH, 'utf8');
  });

  afterAll(() => {
    fs.writeFileSync(DB_FILE_PATH, backupDB, 'utf8');
  });

  it('Data imported correctly.', () => {
    expect(db.genres).toBeInstanceOf(Array<string>);
    expect(db.movies).toBeInstanceOf(Array<Movie>);
  });

  it('Json file update successful.', () => {
    expect(updateDB(exampleMovie)).toBeGreaterThan(0);
  });
});
