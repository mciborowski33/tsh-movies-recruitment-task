import db, { initialize } from 'db';
import checkGenre from '../checkGenre';

describe('Only genres from db are allowed.', () => {
  beforeAll(() => {
    initialize();
  });

  it('Valid genres are verified.', () => {
    const { genres } = db;
    const randomElementsNumber = Math.floor(Math.random() * 3);
    const randomGenres = [...genres].sort(() => 0.5 - Math.random()).slice(0, randomElementsNumber);
    expect(checkGenre(randomGenres)).toBe(true);
  });

  it('Wrong genres are rejected.', () => {
    const { genres } = db;
    const randomElementsNumber = Math.floor(Math.random() * 3) + 1;
    const randomGenres = [...genres].sort(() => 0.5 - Math.random()).slice(0, randomElementsNumber);
    randomGenres[Math.floor(Math.random() * randomGenres.length)] = 'FAKE';
    expect(checkGenre(randomGenres)).toBe(false);
  });
});
