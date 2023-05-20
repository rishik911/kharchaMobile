const {getYearsData} = require('../../src/Modules/Expenses/Utils/Helpers');

describe('getYearsData test cases', () => {
  it('empty expense array', () => {
    const expense = [];
    const response = getYearsData(expense);
    expect(response).toStrictEqual([]);
  });

  it('valid expenses', () => {
    const expense = [{year: '2023', data: [], id: '1234'}];
    const response = getYearsData(expense);
    expect(response).toStrictEqual([{year: '2023', id: '1234'}]);
  });
});
