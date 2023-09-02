const { db } = require('../../db');
const { organizeStringProducts } = require('../helper/organizeStringProducts');
const { capitalizeFirstLetter } = require('../helper/capitalizeFirstLetter');
const { api } = require('../../api');
const { getMessageStage } = require('../helper/getMessageStage');
let menu;

const organizeProductsArray = (productsArray, chatId) => {
  const productCounts = {};

  productsArray.forEach((item) => {
    const productName = item.product;
    if (productCounts[productName]) {
      productCounts[productName].repeatCount++;
    } else {
      productCounts[productName] = {
        id: item.id,
        product: capitalizeFirstLetter(productName),
        totalPrice: 0,
        repeatCount: 1,
        priceItem: item.price,
      };
    }
  });

  const resultArray = Object.values(productCounts);

  resultArray.forEach((product) => {
    product.totalPrice = product.priceItem * product.repeatCount;
  });

  db[chatId].itensOrg = resultArray;
};

const execute = async (chatId, message, cttName) => {
  if (message) {
    if (message === '1') {
      const hasAddress = db[chatId].address.length ? true : false;

      switch (hasAddress) {
        case true:
          db[chatId].stage = 4;
          break;
        case false:
          db[chatId].stage = 2;
          break;
      }

      const resMsg = await getMessageStage(chatId, null, cttName);

      return resMsg;
    }

    if (message === '2') {
      db[chatId] = {
        stage: 0,
        itensOrg: [],
        itensUnorg: [],
        address: '',
        payment: {
          method: '',
          tip: '',
          total: 0,
        },
      };

      return '*❌ Pedido Cancelado! Obrigado pela preferência.*';
    }

    if (message === '3') {
      db[chatId].stage = 1.1;
      const resMsg = await getMessageStage(chatId, null, cttName);

      return resMsg;
    }

    const productChoice = await api.getProductChoice(message);
    if (productChoice) {
      const productCart = {
        id: productChoice.id,
        product: productChoice.product,
        price: productChoice.price,
      };
      db[chatId].itensUnorg.push(productCart);

      organizeProductsArray(db[chatId].itensUnorg, chatId);

      const totalPrice = db[chatId].itensOrg
        .reduce((acc, item) => acc + item.totalPrice, 0)
        .toFixed(2);

      const productsCartString = organizeStringProducts(chatId);

      db[chatId].payment.total = totalPrice;

      return `Você adicionou o produto *${capitalizeFirstLetter(
        productChoice.product,
      )}* ao carrinho. *Digite o código de outro produto para adicionar mais um*

=================
*Seu carrinho:* ${productsCartString}
*Total:* R$ ${totalPrice}
=================

*Digite:*
1️⃣ para *CONFIRMAR* os produtos
2️⃣ para *CANCELAR* o pedido
3️⃣ para *REMOVER* um produto`;
    }

    return `❌ O código digitado não existe! *Digite um código válido.*`;
  }

  menu = await api.getAllProducts();

  let menuStr = '';
  menu.forEach(
    (item) =>
      (menuStr += `*[${item.id}]* - ${capitalizeFirstLetter(
        item.product,
      )} - R$ ${item.price.toFixed(2)}\n`),
  );

  return `🍽 *Cardápio*
  
${menuStr}
*ℹ Digite o código do produto para adicionar no carrinho*`;
};

exports.execute = execute;
