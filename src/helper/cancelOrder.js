const { db } = require('../../db');

const cancelOrder = (chatId) => {
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
};

exports.cancelOrder = cancelOrder;
