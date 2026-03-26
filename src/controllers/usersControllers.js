const User = require('../models/user');

const getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
};

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};

const updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.update(req.body);
  res.json(user);
};

const deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.json({ message: "Eliminado" });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};