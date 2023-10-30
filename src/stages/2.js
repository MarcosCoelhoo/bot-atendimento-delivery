const { db } = require('../../db');
const { capitalizeFirstLetter } = require('../helper/capitalizeFirstLetter');
const { getMessageStage } = require('../helper/getMessageStage');

const execute = async (chatId, message, cttName) => {
  if (message) {
    if (message === '1') {
      db[chatId].stage = 3;
      db[chatId].payment.method = 'Pix';
      db[chatId].payment.tip = null;

      const respMsg = await getMessageStage(chatId, null, cttName);

      return respMsg;
    }

    if (message === '2') {
      db[chatId].payment.method = 'Espécie';

      return '*Necessita de troco? Caso sim, mande o valor do troco*';
    }

    if (message === '3') {
      db[chatId].stage = 1;
      const respMsg = await getMessageStage(chatId, null, cttName);

      return respMsg;
    }

    if (db[chatId].payment.method === 'Espécie') {
      db[chatId].stage = 3;
      db[chatId].payment.tip = message;

      const respMsg = await getMessageStage(chatId, null, cttName);

      return respMsg;
    }

    return `❌ O código digitado não existe! *Digite um código válido.*`;
  }

  return `${capitalizeFirstLetter(cttName)}, *qual será a forma de pagamento?*
  
1️⃣ para pagar no *PIX*
2️⃣ para pagar em *ESPÉCIE*
3️⃣ para *VOLTAR* para o *CARDÁPIO*`;
};

exports.execute = execute;
