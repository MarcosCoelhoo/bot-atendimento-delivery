const fs = require('fs');
const path = require('path');
const wppconnect = require('@wppconnect-team/wppconnect');
const { startBot } = require('./index');

wppconnect
  .create({
    session: 'Lud Atendente',
    logQR: true,
    headless: true,
    catchQR: (base64Qr) => {
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }

      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      var imageBuffer = response;
      fs.writeFile(
        path.join(__dirname, './assets/qrCode.png'),
        imageBuffer['data'],
        'binary',
        function (err) {
          if (err != null) {
            console.log(err);
          }
        },
      );
    },
  })
  .then((client) => {
    startBot(client);
    console.log('Bot is ready');
  })
  .catch((error) => console.log(error));
