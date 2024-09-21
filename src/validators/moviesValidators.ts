import { checkGenre } from 'utils';
import { z } from 'zod';

export const getMoviesSchema = {
  query: z.object({
    duration: z.preprocess((value) => Number(value), z.number().min(0)).optional(),
    genres: z
      .preprocess((obj) => {
        if (typeof obj === 'string') {
          try {
            return JSON.parse(obj);
          } catch (error) {
            throw new Error('Invalid genres data.');
          }
        }
      }, z.string().array())
      .optional(),
  }),
};

export const newMovieSchema = {
  body: z.object({
    title: z.string().trim().min(1).max(255),
    year: z.number(),
    runtime: z.number(),
    director: z.string().trim().min(1).max(255),
    actors: z.string().optional(),
    plot: z.string().optional(),
    posterUrl: z.string().optional(),
    genres: z
      .string()
      .array()
      .refine((items) => new Set(items).size === items.length, {
        message: 'Provided genres must be unique.',
      })
      .refine((items) => checkGenre(items), {
        message: 'Incorrect genres provided.',
      }),
  }),
};
