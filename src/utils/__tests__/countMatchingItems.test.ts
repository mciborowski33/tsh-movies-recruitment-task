import countMatchingItems from '../countMatchingItems';

describe('Function countMatchingElements should count how many genres from query params are matched with movie.', () => {
  it('Utility function returns proper values.', () => {
    expect(countMatchingItems(['Comedy', 'Fantasy', 'Crime'], ['Crime', 'Fantasy', 'Comedy'])).toBe(
      3,
    );
    expect(countMatchingItems(['Comedy', 'Fantasy', 'Crime'], ['Crime', 'Comedy', 'Fantasy'])).toBe(
      3,
    );
    expect(countMatchingItems(['Comedy', 'Crime'], ['Crime', 'Comedy', 'Fantasy'])).toBe(2);
    expect(countMatchingItems(['Comedy', 'Fantasy', 'Crime'], ['Comedy', 'Fantasy'])).toBe(2);
    expect(countMatchingItems(['Action'], ['Crime', 'Comedy', 'Action'])).toBe(1);
    expect(countMatchingItems(['Action'], ['Crime', 'Comedy', 'Fantasy'])).toBe(0);
  });
});
