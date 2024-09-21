import { Router } from 'express';

import { addMovie, getMovies } from 'controllers/moviesControllers';
import validate from 'middleware/validate';
import { getMoviesSchema, newMovieSchema } from 'validators/moviesValidators';

const apiRouter = Router();

apiRouter.get('/movies', validate(getMoviesSchema), getMovies);
apiRouter.post('/movies', validate(newMovieSchema), addMovie);

export default apiRouter;
