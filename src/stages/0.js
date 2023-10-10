const { db } = require('../../db');
const { capitalizeFirstLetter } = require('../helper/capitalizeFirstLetter');
const { getMessageStage } = require('../helper/getMessageStage');

const execute = async (chatId, message, cttName) => {
  if (message === '1') {
    db[chatId].stage = 1;

    const resMsg = await getMessageStage(chatId, null, cttName);

    return resMsg;
  }

  if (message === '2') {
    await db.client.sendText(
      chatId,
      `*ESSE FAQ É FICTICIO!*
      
      *1️⃣ Como faço um pedido?*
    - Para fazer um pedido, basta digitar "Pedir" ou escolher a opção "Fazer Pedido" no menu. Em seguida, siga as instruções para selecionar os itens desejados e confirmar seu pedido.
    
    *2️⃣ Quais são as opções de pagamento?*
    - Aceitamos pagamento em dinheiro na entrega e também através de cartões de crédito/débito online. Basta escolher a opção de pagamento que preferir durante o processo de pedido.
    
    *3️⃣ Qual é a área de entrega?*
    - Atendemos a área X, Y e Z. Você pode verificar se sua localização está dentro da nossa área de entrega digitando seu CEP ou endereço completo.
     
    *4️⃣ Quanto tempo leva para a entrega?*
    - O tempo de entrega varia conforme a demanda e a distância. Geralmente, nossas entregas levam em média de 30 a 45 minutos. No entanto, em horários de pico, pode levar um pouco mais.
     
    *5️⃣ Posso rastrear meu pedido?*
    - Sim, você pode rastrear seu pedido. Após a confirmação, você receberá um link de rastreamento que permite acompanhar o status da entrega em tempo real.
    
    *6️⃣ Como faço para cancelar um pedido?*
    - Se você deseja cancelar um pedido, entre em contato conosco o mais rápido possível através do número de telefone fornecido. Se o pedido ainda não tiver sido preparado, poderemos processar o cancelamento.
    
    *7️⃣ Vocês têm opções vegetarianas/veganas?*
    - Sim, temos opções vegetarianas e veganas em nosso cardápio. Você pode verificar as opções marcadas com símbolos específicos ou filtrar por preferências alimentares.
     
    *8️⃣ Como faço para adicionar ou remover itens do meu pedido?*
    - Se você deseja adicionar ou remover itens do seu pedido, entre em contato conosco imediatamente via telefone. Se o pedido ainda não estiver em preparação, faremos o possível para atender às suas solicitações.
    
    *9️⃣ Como entro em contato com um atendente humano?*
    - Se precisar falar com um atendente humano, basta digitar "Atendente" ou escolher a opção "Falar com um Atendente" no menu. Nossa equipe estará pronta para ajudar com suas dúvidas e preocupações`,
    );
  }

  if (message === '3') {
    await db.client.sendContactVcard(
      chatId,
      '559192542214@c.us',
      'Marcélia Atendente',
    );
  }

  return `Olá, ${capitalizeFirstLetter(
    cttName,
  )}. Eu sou o *Lud*, o robô assistente que irá atender você!

*Digite:*
1️⃣ para ver o *CARDÁPIO*
2️⃣ para ver as *PERGUNTAS FREQUENTES*
3️⃣ para *FALAR COM UMA ATENDENTE*`;
};

exports.execute = execute;
