import { SearchParameters } from './repository-contracts';

describe('[Unit] Repository Contracts', () => {
  test('[method] should be able to set page property', () => {
    const arrange = [
      { page: null, expected: 1 },
      { page: undefined, expected: 1 },
      { page: '', expected: 1 },
      { page: 'fake', expected: 1 },
      { page: 0, expected: 1 },
      { page: -1, expected: 1 },
      { page: 1.1, expected: 1 },
      { page: true, expected: 1 },
      { page: {}, expected: 1 },
      { page: 1, expected: 1 },
      { page: 2, expected: 2 },
    ];

    arrange.forEach((item) => {
      expect(new SearchParameters({ page: item.page as any }).page).toBe(
        item.expected
      );
    });
  });

  test('[method] should be able to set per_page property', () => {
    const parameters = new SearchParameters();
    expect(parameters.per_page).toBe(15);

    const arrange = [
      { per_page: null, expected: 15 },
      { per_page: undefined, expected: 15 },
      { per_page: '', expected: 15 },
      { per_page: 'fake', expected: 15 },
      { per_page: 0, expected: 15 },
      { per_page: -1, expected: 15 },
      { per_page: 1.1, expected: 15 },
      { per_page: {}, expected: 15 },
      { per_page: true, expected: 15 },
      { per_page: 1, expected: 1 },
      { per_page: 2, expected: 2 },
    ];

    arrange.forEach((item) => {
      expect(
        new SearchParameters({ per_page: item.per_page as any }).per_page
      ).toBe(item.expected);
    });
  });

  test('[method] should be able to set sort property', () => {
    const parameters = new SearchParameters();
    expect(parameters.sort).toBeNull();

    const arrange = [
      { sort: null, expected: null },
      { sort: undefined, expected: null },
      { sort: '', expected: null },
      { sort: 'field', expected: 'field' },
      { sort: 0, expected: '0' },
      { sort: -1, expected: '-1' },
      { sort: 1.1, expected: '1.1' },
      { sort: true, expected: 'true' },
      { sort: {}, expected: '[object Object]' },
      { sort: 1, expected: '1' },
      { sort: 2, expected: '2' },
    ];

    arrange.forEach((item) => {
      expect(new SearchParameters({ sort: item.sort as any }).sort).toBe(
        item.expected
      );
    });
  });

  test('[method] should be able to set sort_direction property', () => {
    let parameters = new SearchParameters();
    expect(parameters.sort_direction).toBeNull();

    parameters = new SearchParameters({ sort: null });
    expect(parameters.sort_direction).toBeNull();

    parameters = new SearchParameters({ sort: undefined });
    expect(parameters.sort_direction).toBeNull();

    parameters = new SearchParameters({ sort: '' });
    expect(parameters.sort_direction).toBeNull();

    const arrange = [
      { sort_direction: null, expected: 'asc' },
      { sort_direction: undefined, expected: 'asc' },
      { sort_direction: '', expected: 'asc' },
      { sort_direction: 'field', expected: 'asc' },
      { sort_direction: 0, expected: 'asc' },
      { sort_direction: -1, expected: 'asc' },
      { sort_direction: 1.1, expected: 'asc' },
      { sort_direction: true, expected: 'asc' },
      { sort_direction: {}, expected: 'asc' },
      { sort_direction: 1, expected: 'asc' },
      { sort_direction: 2, expected: 'asc' },
      { sort_direction: 'asc', expected: 'asc' },
      { sort_direction: 'ASC', expected: 'asc' },
      { sort_direction: 'desc', expected: 'desc' },
      { sort_direction: 'DESC', expected: 'desc' },
    ];

    arrange.forEach((item) => {
      expect(
        new SearchParameters({
          sort: 'field',
          sort_direction: item.sort_direction as any,
        }).sort_direction
      ).toBe(item.expected);
    });
  });

  test('[method] should be able to set filter property', () => {
    const parameters = new SearchParameters();
    expect(parameters.filter).toBeNull();

    const arrange = [
      { filter: null, expected: null },
      { filter: undefined, expected: null },
      { filter: '', expected: null },
      { filter: 'fake', expected: 'fake' },
      { filter: 0, expected: '0' },
      { filter: -1, expected: '-1' },
      { filter: 1.1, expected: '1.1' },
      { filter: true, expected: 'true' },
      { filter: {}, expected: '[object Object]' },
      { filter: 1, expected: '1' },
      { filter: 2, expected: '2' },
    ];

    arrange.forEach((item) => {
      expect(new SearchParameters({ filter: item.filter as any }).filter).toBe(
        item.expected
      );
    });
  });
});
