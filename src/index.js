const { db } = require('../db');
const { stages } = require('../stages');

const getStage = (user) => {
  if (!db[user]) {
    db[user] = {
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

    return db[user].stage;
  }

  return db[user].stage;
};

const startBot = (client) => {
  db.client = client;
  client.onMessage(async (message) => {
    if (!message.isGroupMsg && message.from !== 'status@broadcast') {
      const resMsg = await stages[getStage(message.chatId)].exec.execute(
        message.chatId,
        message.body,
        message.sender.pushname,
      );

      console.log('Client: ', `${message.sender.pushname} (${message.from})`);
      console.log(message.body);
      client.sendText(message.chatId, resMsg);
    }
  });
};

exports.startBot = startBot;
