import { Server } from './server/server';

(async () => {
  const server: Server = new Server();
  await server.init();
  server.start();
})();