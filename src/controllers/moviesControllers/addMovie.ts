import { Request, Response } from 'express';

import { updateDB } from 'db';

const addMovie = (req: Request, res: Response) => {
  const newMovie = req.body;

  try {
    const id = updateDB(newMovie);
    return res.status(200).json({ id });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

export default addMovie;
