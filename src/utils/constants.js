const isProduction = process.env.NODE_ENV === 'production';
const baseURL = isProduction
  ? `http://13.250.10.117:17001/v1/eth/`
  : `http://13.250.10.117:17001/v1/eth/`;

//const socketIOURL = 'http://54.169.197.219:17002';
const socketIOURL = 'https://explorer-web.api.btc.com';
//wss://explorer-web.api.btc.com/socket.io/?EIO=3&transport=websocket

export { isProduction, baseURL, socketIOURL };
