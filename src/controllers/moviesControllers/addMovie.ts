import { Request, Response } from 'express';

import db, { updateDB } from 'db';

const addMovie = (req: Request, res: Response) => {
  const { movies } = db;

  const newMovie = { id: movies.length + 1, ...req.body };
  movies.push(newMovie);
  try {
    updateDB();
  } catch (error: any) {
    res.status(500).json(error.message);
    return;
  }

  res.status(200).json(newMovie);
};

export default addMovie;
