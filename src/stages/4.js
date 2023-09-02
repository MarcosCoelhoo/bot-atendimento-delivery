const { db } = require('../../db');
const { organizeStringProducts } = require('../helper/organizeStringProducts');
const { capitalizeFirstLetter } = require('../helper/capitalizeFirstLetter');
const { cancelOrder } = require('../helper/cancelOrder');

const execute = async (chatId, message, cttName) => {
  const { itensOrg, address } = db[chatId];

  const { method, total, tip } = db[chatId].payment;

  const productsCartString = organizeStringProducts(chatId);

  if (message) {
    if (message === '1') {
      await db.client.sendText(
        '559192542214@c.us',
        `*🔔 Novo pedido*
  
*Cliente:* ${capitalizeFirstLetter(cttName)} (https://wa.me/${chatId.slice(
          0,
          12,
        )})
  
*Produtos:* ${productsCartString}
*Total:* R$ ${total}
*Endereço:* ${address}
*Pagamento:* ${method}
${tip ? '*Troco:* ' + tip : ''}`,
      );

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

      return `*✅ Pedido feito, ${capitalizeFirstLetter(
        cttName,
      )}. Obrigado por comprar conosco, pedido chegará em breve.*

*Mais informações:* wa.me/559192542214
`;
    }

    if (message === '2') {
      const cancelMsg = cancelOrder(chatId);

      return cancelMsg;
    }

    return `❌ O código digitado não existe! *Digite um código válido.*`;
  }

  return `*📃 Resumo do seu pedido*

*Produtos:* ${productsCartString}
*Total:* R$ ${total}
*Endereço:* ${address}
*Pagamento:* ${method}
${tip ? '*Troco:* ' + tip : ''}

${method === 'Pix' ? '*Chave Pix:* 91985426763 (Marcos Vinicius C. Maia)' : ''}

*Digite:*
1️⃣ para *CONFIRMAR* os produtos
2️⃣ para *CANCELAR* o pedido`;
};

exports.execute = execute;
