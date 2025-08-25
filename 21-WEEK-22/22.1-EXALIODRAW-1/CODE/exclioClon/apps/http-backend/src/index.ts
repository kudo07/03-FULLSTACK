import {
  CreateRoomSchema,
  CreateUserSchema,
  SigninSchema,
} from '@repo/common/types';
import express from 'express';
import { prismaClient } from '@repo/db/client';
import jwt from 'jsonwebtoken';

import { middleware } from './middleware';
const app = express();
const JWT_SECRET = '21331';
app.use(express.json());

app.post('/signup', async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);

  if (!parsedData.success) {
    console.log(parsedData.error);
    res.json({
      message: 'Incorrect inputs',
    });
    return;
  }
  try {
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data?.username,
        password: parsedData.data.password,
        name: parsedData.data.name,
      },
    });
    res.json({
      userId: user.id,
    });
  } catch (error) {
    res.status(411).json({ message: 'User already exists with this username' });
  }
});

app.post('/signin', async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: 'Incorrect inputs',
    });
    return;
  }
  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });
  if (!user) {
    res.status(403).json({
      message: 'Not authorized',
    });
    return;
  }
  const token = jwt.sign(
    {
      userId: user?.id,
    },
    JWT_SECRET
  );
  res.json({
    token,
  });
});

app.post('/room', middleware, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({ message: 'Incorrect Inputs' });
    return;
  }
  //@ts-ignore
  const userId = req?.userId;

  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data.name,
        adminId: userId,
      },
    });
    res.json({
      roomID: room.id,
    });
  } catch (error) {
    res.status(411).json({
      message: 'Room already exists with this name',
    });
  }
});
app.get('/chats/:roomId', async (req, res) => {
  const roomId = Number(req.params.roomId);
  const messages = await prismaClient.chat.findMany({
    where: {
      roomId: roomId,
    },
    orderBy: {
      id: 'desc',
    },
    take: 50,
  });
  res.json({
    messages,
  });
});

app.get('/room/:slug', async (req, res) => {
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where: {
      slug,
    },
  });
  res.json({ room });
});
app.listen(3030);
