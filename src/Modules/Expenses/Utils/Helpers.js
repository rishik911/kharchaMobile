export const getYearsData = expense => {
  if (expense?.length > 0) {
    const response = [];
    for (let i = 0; i < expense?.length; i++) {
      let obj = {};
      obj['year'] = expense[i]?.year;
      obj['id'] = expense[i]?.id;
      response.push(obj);
    }
    return response;
  } else return [];
};

export const getMonthsData = (expense, year) => {
  if (expense?.length > 0 && year) {
    const response = expense?.find(item => item?.year === year);
    return response?.months || [];
  } else return [];
};

export const geneateMemberExpenses = expenseDetails => {
  let arr = [];
  expenseDetails.forEach(curr => {
    const {spendBy, amount} = curr;
    const isMemberAdded = arr?.findIndex(mem => mem?.name === spendBy);
    if (isMemberAdded >= 0) {
      arr[isMemberAdded].amount += amount;
    } else {
      let obj = {};
      obj.name = spendBy;
      obj.amount = amount;
      arr.push(obj);
    }
  });
  return arr;
};
