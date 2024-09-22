import request from 'supertest';

import { initialize } from 'db';
import { Movie } from 'types/movie';
import { countMatchingItems } from 'utilities';

import app from '../../../app';

import { checkRuntimes, getRandomDuration, isArraySorted } from './helpers';

describe('Controller responsible for fetching movies works as intended.', () => {
  beforeAll(() => {
    initialize();
  });

  it('Controller returns random movie.', async () => {
    const response = await request(app).get(`/api/movies`);
    const { statusCode, body } = response;
    expect(statusCode).toEqual(200);
    expect(body).toBeInstanceOf(Array<Movie>);
  });

  it('Controller returns random movie with duration close to query value.', async () => {
    const randomDuration = getRandomDuration();
    const response = await request(app).get(`/api/movies?duration=${randomDuration}`);
    const { statusCode, body } = response;
    expect(statusCode).toEqual(200);
    expect(body).toBeInstanceOf(Array<Movie>);
    expect(checkRuntimes(body as Array<Movie>, randomDuration)).toBe(true);
  });

  it('Controller throws validation error in case of invalid duration.', async () => {
    const response = await request(app).get(`/api/movies?duration=NotANumber`);
    const { statusCode } = response;
    expect(statusCode).toEqual(422);
  });

  it('Controller throws validation error in case of invalid genres.', async () => {
    const genres = JSON.stringify(['Action', 'FAKE', 'Fantasy']);
    const response = await request(app).get(`/api/movies?genres=${genres}`);
    const { statusCode } = response;
    expect(statusCode).toEqual(422);
  });

  it('Controller throws validation error in case of empty genres array.', async () => {
    const response = await request(app).get(`/api/movies?genres=[]`);
    const { statusCode } = response;
    expect(statusCode).toEqual(422);
  });

  it('Controller returns all movies with provided genres, sorted by occurences of those genres.', async () => {
    const queryGenres = ['Action', 'Adventure', 'Fantasy'];
    const response = await request(app).get(`/api/movies?genres=${JSON.stringify(queryGenres)}`);
    const { statusCode, body } = response;
    expect(statusCode).toEqual(200);
    expect(body).toBeInstanceOf(Array<Movie>);
    const genresOccurences = (body as Array<Movie>).map(({ genres }) => {
      return countMatchingItems(genres, queryGenres);
    });
    expect(isArraySorted(genresOccurences)).toBe(true);
  });

  it('Controller returns all movies with provided genres, with duration close to query value, sorted by occurences of those genres.', async () => {
    const queryGenres = ['Action', 'Adventure', 'Fantasy'];
    const randomDuration = getRandomDuration();
    const response = await request(app).get(
      `/api/movies?duration=${randomDuration}&genres=${JSON.stringify(queryGenres)}`,
    );
    const { statusCode, body } = response;
    expect(statusCode).toEqual(200);
    expect(body).toBeInstanceOf(Array<Movie>);
    expect(checkRuntimes(body as Array<Movie>, randomDuration)).toBe(true);
    const genresOccurences = (body as Array<Movie>).map(({ genres }) => {
      return countMatchingItems(genres, queryGenres);
    });
    expect(isArraySorted(genresOccurences)).toBe(true);
  });
});
