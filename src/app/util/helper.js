export const objectToArray = object => {
  let arrayResult = [];
  for (let i in object) {
    arrayResult.push({
      ...object[i],
      id: i,
    });
  }

  return arrayResult;
};
