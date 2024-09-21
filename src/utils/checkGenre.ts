import db from 'db';

const checkGenre = (genresArr: string[]): boolean => {
  const { genres } = db;

  return genresArr.every((genre) => genres.includes(genre));
};

export default checkGenre;
