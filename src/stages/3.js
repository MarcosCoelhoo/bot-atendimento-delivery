const { db } = require('../../db');
const { capitalizeFirstLetter } = require('../helper/capitalizeFirstLetter');
const { getMessageStage } = require('../helper/getMessageStage');

const execute = async (chatId, message, cttName) => {
  if (message) {
    if (message.length < 3) {
      return '*❌ Endereço inválido! Digite um endereço válido*';
    }

    db[chatId].address = message;
    db[chatId].stage = 4;

    const resMsg = await getMessageStage(chatId, null, cttName);

    return resMsg;
  }

  return `*Certo, ${capitalizeFirstLetter(
    cttName,
  )}. Agora nos diga seu endereço.*

_Ex.: Marapira, Airton Sena, 190_`;
};

exports.execute = execute;
