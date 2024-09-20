import { Request, Response } from 'express';

import { sum } from 'utils/sum';

const sumTwoNumbers = (_req: Request, res: Response) => {
  const result = sum(1, 2);
  res.status(200).json(`Result: ${result}`);
};

export default sumTwoNumbers;
