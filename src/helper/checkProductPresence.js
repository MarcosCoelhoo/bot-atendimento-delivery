const checkProductPresence = (numProduct, productsArray) => {
  if (numProduct) {
    const isPresence = productsArray.some(
      (item) => item.num_product == numProduct,
    );

    return isPresence;
  }

  return false;
};

exports.checkProductPresence = checkProductPresence;
