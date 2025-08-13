import { CreateUserSchema } from '@repo/common/types';
import express from 'express';
import { prismaClient } from '@repo/db/client';
const app = express();
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

app.listen(3030);
