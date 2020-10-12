import { Server } from './server/server';

(async () => {
  const server: Server = new Server();
  // test git hub commit
  await server.init();
  server.start();
})();
