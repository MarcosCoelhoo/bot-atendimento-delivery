const { db } = require('../../db');

const organizeStringProducts = (chatId) => {
  const productsCartString = db[chatId].itensOrg
    .map(
      (item) =>
        `${item.repeatCount}x ${item.name} (R$ ${item.totalPrice.toFixed(2)})`,
    )
    .join(', ');

  return productsCartString;
};

exports.organizeStringProducts = organizeStringProducts;
