// initialize leancloud storage
const AV = require("leancloud-storage");
AV.init({
  appId: process.env.VUE_APP_ID,
  appKey: process.env.VUE_APP_KEY,
  serverURL: process.env.VUE_APP_SERVER_URL,
});

const { Realtime } = require('leancloud-realtime');
export const realtime = new Realtime({
  appId: process.env.VUE_APP_ID,
  appKey: process.env.VUE_APP_KEY,
  server: process.env.VUE_APP_SERVER_URL,
});