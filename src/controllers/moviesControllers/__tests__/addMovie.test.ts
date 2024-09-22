import fs from 'fs';
import request from 'supertest';

import { DB_FILE_PATH } from 'config';
import { initialize } from 'db';

import app from '../../../app';

import { exampleMovies } from './helpers';

describe('Controller responsible for adding new movies to json file.', () => {
  let backupDB = '';

  beforeAll(() => {
    initialize();
    backupDB = fs.readFileSync(DB_FILE_PATH, 'utf8');
  });

  afterAll(() => {
    fs.writeFileSync(DB_FILE_PATH, backupDB, 'utf8');
  });

  it('New movie can be added.', async () => {
    const response = await request(app)
      .post(`/api/movies`)
      .send(exampleMovies.validMovie)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    const { statusCode } = response;
    expect(statusCode).toEqual(200);
  });

  it('Request with missing fields must be validated.', async () => {
    const response = await request(app)
      .post(`/api/movies`)
      .send(exampleMovies.errorMovie1)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    const { statusCode } = response;
    expect(statusCode).toEqual(422);
  });

  it('Genres must be provided.', async () => {
    const response = await request(app)
      .post(`/api/movies`)
      .send(exampleMovies.errorMovie2)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    const { statusCode } = response;
    expect(statusCode).toEqual(422);
  });

  it('Valid genres must be provided.', async () => {
    const response = await request(app)
      .post(`/api/movies`)
      .send(exampleMovies.errorMovie3)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    const { statusCode } = response;
    expect(statusCode).toEqual(422);
  });
});
