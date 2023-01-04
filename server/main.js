import { WebApp, WebAppInternals } from 'meteor/webapp';

WebApp.connectHandlers.use('/', (req, res, next) => {
  const source = req.headers['user-agent'];
  console.log(source);
  console.log(WebAppInternals.identifyBrowser(source));
});
