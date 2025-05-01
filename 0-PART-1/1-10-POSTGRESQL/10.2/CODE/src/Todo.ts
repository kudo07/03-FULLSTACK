import { PrismaClient } from '@prisma/client';
import { todo } from 'node:test';
const prisma = new PrismaClient();
async function createTodo(userId: number, title: string, description: string) {
  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      userId,
    },
  });
  console.log(todo);
}
createTodo(1, 'go to gym', 'go to gym and do 10 pushups');

// npx tsx -b
// node dist/Todo.js

// GET TODOS
async function getTodos(userId: number) {
  const todos = await prisma.todo.findMany({
    where: {
      userId: userId,
    },
  });
  console.log(todos);
}

getTodos(1);

//3. GET TODOS AND USER DETAILS

// todo detials of a user along witht he user details

// basic answer not rec
async function getTodosAndDetails(userId: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  const todos = await prisma.todo.findMany({
    where: {
      userId: userId,
    },
  });
  console.log(user);
  console.log(todo);
}

getTodosAndDetails(1);
// Npx TSC -B
// node dist/index.js

// using joins

async function getTodosUserDetailsJoin(userId: number) {
  const todos = await prisma.todo.findMany({
    where: { userId: userId },
    select: {
      userId: true,
      title: true,
      description: true,
    },
  });
  console.log(todos);
}
getTodosUserDetailsJoin(1);
