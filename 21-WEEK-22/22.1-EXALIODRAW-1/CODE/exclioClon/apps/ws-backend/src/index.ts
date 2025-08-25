import { WebSocket, WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { prismaClient } from '@repo/db/client';
// import { JWT_SECRET } from '../../../packages/backend-common/dist/index.js';
const JWT_SECRET = '21331';
const wss = new WebSocketServer({ port: 8082 });

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}
const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded == 'string') {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch (e) {
    return null;
  }
}

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  // we dont want unauthenticated users to connect our servers
  const queryParams = new URLSearchParams(url?.split('?')[1]);
  const token = queryParams.get('token') || '';
  const userId = checkUser(token);
  if (userId == null) {
    ws.close();
    return null;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on('message', async function message(data) {
    let parsedData;
    if (typeof data !== 'string') {
      parsedData = JSON.parse(data.toString()); // '{type: "join-room", roomId: 1}'
    } else {
      parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
    }
    if (parsedData.type === 'join room') {
      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(parsedData.roomId);
    }
    if (parsedData.type === 'leave_room') {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter((x) => x !== parsedData.room);
    }
    console.log('message recieved');
    console.log(parsedData);

    if (parsedData.type === 'chat') {
      const roomId = parsedData.roomId;
      const message = parsedData.message;
      // save the messages in the database
      await prismaClient.chat.create({
        data: {
          roomId: Number(roomId),
          message,
          userId,
        },
      });
      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: 'chat',
              message,
              roomId,
            })
          );
        }
      });
    }
  });
});
