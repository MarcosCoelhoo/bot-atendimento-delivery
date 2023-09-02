const checkProductPresence = (idChoice, productsArray) => {
  if (idChoice) {
    const isPresence = productsArray.some((item) => item.id == idChoice);

    return isPresence;
  }

  return false;
};

exports.checkProductPresence = checkProductPresence;
