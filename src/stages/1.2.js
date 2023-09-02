const { db } = require('../../db');
const { cancelOrder } = require('../helper/cancelOrder');
const { getMessageStage } = require('../helper/getMessageStage');

const execute = async (chatId, message, cttName) => {
  if (message) {
    if (message === '1') {
      db[chatId].stage = 1;

      const resMsg = await getMessageStage(chatId, null, cttName);

      return resMsg;
    }

    if (message === '2') {
      const cancelMsg = cancelOrder(chatId);

      return cancelMsg;
    }

    return `❌ O código digitado não existe! *Digite um código válido.*`;
  }

  return `*⚠ Seu carrinho está VAZIO! Volte para o cardápio ou cancele o pedido*

*Digite:*
1️⃣ Para ir para o *CARDÁPIO*
2️⃣ Para *CANCELAR* seu pedido     
`;
};

exports.execute = execute;
