import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../../../packages/backend-common/dist/index.js';

const wss = new WebSocketServer({ port: 8082 });

wss.on('connection', function connection(ws, request) {
  ws.on('message', function message(data) {
    const url = request.url;
    // we dont want unauthenticated users to connect our servers
    const queryParams = new URLSearchParams(url?.split('?')[1]);
    const token = queryParams.get('token') || '';
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'string') {
      ws.close();
      return;
    }
    if (!decoded || !(decoded as JwtPayload).userId) {
      ws.close();
      return;
    }
    ws.send('pong');
  });
});
