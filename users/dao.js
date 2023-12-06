import model from "./model.js";

export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (id) => model.findById(id);
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
  model.findOne({ username: username, password: password });
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
// TODO: add more functions as necessary
// search by region?
// get only buyers/sellers?