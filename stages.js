const stages = {
  0: {
    description: 'Boas-vindas',
    exec: require('./src/stages/0'),
  },
  1: {
    description: 'Cardápio',
    exec: require('./src/stages/1'),
  },
  1.1: {
    description: 'Remover produto',
    exec: require('./src/stages/1.1'),
  },
  1.2: {
    description: 'Carrinho vazio',
    exec: require('./src/stages/1.2'),
  },
  2: {
    description: 'Forma de pagamento',
    exec: require('./src/stages/2'),
  },
  3: {
    description: 'Endereço',
    exec: require('./src/stages/3'),
  },
  4: {
    description: 'Confirmação de pedido',
    exec: require('./src/stages/4'),
  },
};

exports.stages = stages;
