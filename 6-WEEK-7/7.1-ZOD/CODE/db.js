const mongoose = require('mongoose');

// schema and objectId for mongoose for creating models

const Schema = mongoose.ObjectId;

//  define the user schema with fields for email. password and name
const User = new Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});

// Define the todo schema with fields for title, done ans userId

const Todo = new Schema({
  title: String,
  done: Boolean,
  userId: ObjectId,
});

// create Mongoose models for user and todos collections using the User and todo schemas

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);

module.exports = {
  UserModel,
  TodoModel,
};
