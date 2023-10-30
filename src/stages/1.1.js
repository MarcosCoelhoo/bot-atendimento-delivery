const { api } = require('../../api');
const { db } = require('../../db');
const { checkProductPresence } = require('../helper/checkProductPresence');
const { capitalizeFirstLetter } = require('../helper/capitalizeFirstLetter');
const { getMessageStage } = require('../helper/getMessageStage');

const createStringProductsRemove = (chatId) => {
  let stringProductRemove = '';

  db[chatId].itensOrg.forEach(
    (item) =>
      (stringProductRemove += `*[${item.num_product}]* - ${item.repeatCount}x ${
        item.name
      } (R$ ${item.totalPrice.toFixed(2)})\n`),
  );

  return stringProductRemove;
};

const removeItemCart = (productsArray, numProduct, chatId) => {
  const arrayItemDeleted = productsArray.filter(
    (item) => item.num_product !== +numProduct,
  );

  if (chatId) {
    const totalPrice = arrayItemDeleted
      .reduce((acc, item) => acc + item.totalPrice, 0)
      .toFixed(2);

    db[chatId].payment.total = totalPrice;
  }

  return arrayItemDeleted;
};

const execute = async (chatId, message, cttName) => {
  if (message) {
    if (message === '1') {
      db[chatId].stage = 1;

      const resMsg = await getMessageStage(chatId, null, cttName);

      return resMsg;
    }

    if (message === '2') {
      db[chatId].stage = 2;

      const resMsg = await getMessageStage(chatId, null, cttName);

      return resMsg;
    }

    const isPresence = checkProductPresence(message, db[chatId].itensOrg);
    if (isPresence) {
      const { itensOrg, itensUnorg } = db[chatId];

      db[chatId].itensOrg = removeItemCart(itensOrg, message, chatId);
      db[chatId].itensUnorg = removeItemCart(itensUnorg, message);

      if (!db[chatId].itensOrg.length) {
        db[chatId].stage = 1.2;

        const resMsg = await getMessageStage(chatId, null, cttName);

        return resMsg;
      }

      const productDelected = await api
        .getProductChoice(message)
        .then((item) => item.name);

      const stringProductRemove = createStringProductsRemove(chatId);
      const totalPrice = db[chatId].itensOrg
        .reduce((acc, item) => acc + item.totalPrice, 0)
        .toFixed(2);

      return `*${capitalizeFirstLetter(
        productDelected,
      )}* foi removido do carrinho! *Digite outro código pra remover mais um*
      
${stringProductRemove}
*Total:* R$ ${totalPrice}

*Digite:*
1️⃣ para *ADICIONAR* mais produtos
2️⃣ para *CONTINUAR* seu pedido`;
    }

    return `❌ O código digitado não existe! *Digite um código válido.*`;
  }

  const stringProductRemove = createStringProductsRemove(chatId);

  const totalPrice = db[chatId].itensOrg
    .reduce((acc, item) => acc + item.totalPrice, 0)
    .toFixed(2);

  return `*❌ Digite o código do produto que você deseja remover*

*Carrinho:*
${stringProductRemove}
*Total:* R$ ${totalPrice}

*Digite:*
1️⃣ para ir para o *CARDÁPIO*
2️⃣ para *CONTINUAR* seu pedido`;
};

exports.execute = execute;
