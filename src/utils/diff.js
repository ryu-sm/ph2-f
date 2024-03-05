export const diffObj = (oldObj, newObj) => {
  const updatedProperties = {};

  for (const key in newObj) {
    if (oldObj.hasOwnProperty(key)) {
      if (oldObj[key] !== newObj[key]) {
        updatedProperties[key] = newObj[key];
      }
    }
  }

  return updatedProperties;
};
