const countMatchingItems = (array1: string[], array2: string[]): number => {
  let count = 0;

  array1.forEach((item) => {
    if (array2.includes(item)) count += 1;
  });

  return count;
};

export default countMatchingItems;
