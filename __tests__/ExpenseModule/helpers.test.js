const {
  getYearsData,
  geneateMemberExpenses,
} = require('../../src/Modules/Expenses/Utils/Helpers');

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

describe('generate member expense test case', () => {
  it('multiple members', () => {
    const expense = [
      {amount: 10, spendBy: 'Om'},
      {amount: 20, spendBy: 'rishik'},
      {amount: 40, spendBy: 'suraj'},
      {amount: 10, spendBy: 'rishik'},
      {amount: 20, spendBy: 'rishik'},
      {amount: 40, spendBy: 'suraj'},
    ];
    const response = geneateMemberExpenses(expense);
    expect(response).toStrictEqual([
      {name: 'Om', amount: 10},
      {name: 'rishik', amount: 50},
      {name: 'suraj', amount: 80},
    ]);
  });
});
