const { db } = require('../../db');
const { capitalizeFirstLetter } = require('../helper/capitalizeFirstLetter');
const { getMessageStage } = require('../helper/getMessageStage');

const execute = async (chatId, message, cttName) => {
  if (message) {
    if (message === '1') {
      db[chatId].stage = 2;
      const respMsg = await getMessageStage(chatId, null, cttName);

      return respMsg;
    }

    if (message.length > 3) {
      db[chatId].address = message;
      db[chatId].stage = 4;

      const resMsg = await getMessageStage(chatId, null, cttName);

      return resMsg;
    }

    return `*❌ Endereço inválido! Digite um endereço válido*
    
_Ex.: Marapira, Airton Sena, 190_`;
  }

  return `Certo, ${capitalizeFirstLetter(
    cttName,
  )}. *Agora nos diga seu endereço.*

_Ex.: Marapira, Airton Sena, 190_

*Digite:*
1️⃣ para *VOLTAR* para *FORMA DE PAGAMENTO*`;
};

exports.execute = execute;
