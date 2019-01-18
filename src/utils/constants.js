const isProduction = process.env.NODE_ENV === 'production';
const baseURL = isProduction
  ? `https://explorer-web.api.btc.com/v1/eth/`
  : `https://explorer-web-dev.api.btc.com/v1/eth/`;

//const socketIOURL = 'http://54.169.197.219:17002';
const socketIOURL = 'https://explorer-web.api.btc.com';
//wss://explorer-web.api.btc.com/socket.io/?EIO=3&transport=websocket

export { isProduction, baseURL, socketIOURL };
