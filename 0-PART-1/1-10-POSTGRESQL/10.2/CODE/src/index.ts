import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// import mongooose from 'mongoose'
// mongoose.connect()
// same thing
async function insertUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  try {
    const res = await prisma.user.create({
      data: {
        username,
        password,
        firstName,
        lastName,
      },
      select: {
        id: true,
        password: true,
      },
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
insertUser('adminnn', '1232123', 'aa', 'bb');

// UPDATE user
interface UpdataParams {
  firstName: string;
  lastName: string;
}

async function updateUser(
  username: string,
  { firstName, lastName }: UpdataParams
) {
  const res = await prisma.user.update({
    where: { username },
    data: {
      firstName,
      lastName,
    },
  });
  console.log(res);
}
updateUser('adminnn', {
  firstName: 'new Name',
  lastName: 'new lastname',
});

// npx tsc -b
// node dist/index.js

// GET A USER'S DETAIL

async function getUser(username: string) {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  console.log(user);
}

getUser('adminnn');

// npx tsc -b

// node dist/index.js
