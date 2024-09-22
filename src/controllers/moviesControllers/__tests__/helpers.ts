import { Movie } from 'types/movie';

export const getRandomDuration = (): number => {
  return Math.floor(Math.random() * 120) + 60;
};

export const checkRuntimes = (body: Movie[], duration: number): boolean => {
  if (body.length === 0) {
    return true;
  }

  const runtimes = (body as Array<Movie>).map(({ runtime }) => runtime);
  const isRuntimeCorrect = runtimes.every((runtime) => {
    return runtime >= duration - 10 && runtime <= duration + 10;
  });
  return isRuntimeCorrect;
};

export const isArraySorted = (numbers: number[]): boolean => {
  return numbers.reduce((isSorted, value, index) => {
    return isSorted && (index === 0 || numbers[index - 1] >= value);
  }, true);
};

export const exampleMovies = {
  validMovie: {
    title: 'Lorem Ipsum',
    year: 2010,
    runtime: 120,
    genres: ['Action', 'Adventure'],
    director: 'Fake director',
    actors: 'Person Person',
  },
  errorMovie1: {
    title: 'Lorem Ipsum',
    year: 2010,
    runtime: 120,
    director: 'Fake director',
    actors: 'Person Person',
  },
  errorMovie2: {
    title: 'Lorem Ipsum',
    year: 2010,
    runtime: 120,
    genres: [],
    director: 'Fake director',
    actors: 'Person Person',
  },
  errorMovie3: {
    title: 'Lorem Ipsum',
    year: 2010,
    runtime: 120,
    genres: ['Action', 'FAKE', 'Crime'],
    director: 'Fake director',
    actors: 'Person Person',
  },
};
