const { db } = require('../../db');
const stagesObj = require('../../stages');

const getMessageStage = async (chatId, message, cttName) => {
  const resMsg = await stagesObj.stages[db[chatId].stage].exec.execute(
    chatId,
    message,
    cttName,
  );

  return resMsg;
};

exports.getMessageStage = getMessageStage;
