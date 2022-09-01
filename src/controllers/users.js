const model = require('../models/users');
const { generalErrors, usersErrors } = require('../utils/errors');
const { SUCCESS } = require('../utils/vars');

const createUser = async (req, res) => {
  const { username, email, password, firstName, lastName, age, pictureUrl } =
    req.body;

  if (
    !username ||
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    age == null ||
    !pictureUrl
  ) {
    return generalErrors(res, 400);
  }

  const [status, dbRes] = await model.createUser(req.body);

  if (status === SUCCESS) {
    return res.status(201).json({ user: dbRes });
  }

  if (dbRes === 'P2002') {
    return usersErrors(res, 409);
  }

  generalErrors(res, 500);
};

const updateUser = async (req, res) => {
  const userId = parseInt(req.params.userId);

  const [status, dbRes] = await model.updateUser(req.body, userId);

  if (status === SUCCESS) {
    return res.status(201).json({ user: dbRes });
  }

  if (dbRes === 'P2002') {
    return usersErrors(res, 409);
  }

  if (dbRes === 'P2016') {
    return usersErrors(res, 404);
  }

  generalErrors(res, 500);
};

const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.userId);

  const [status, dbRes] = await model.deleteUser(userId);

  if (status === SUCCESS) {
    return res.status(201).json({ user: dbRes });
  }

  if (dbRes === 'P2025') {
    return usersErrors(res, 404);
  }

  generalErrors(res, 500);
};

module.exports = { createUser, updateUser, deleteUser };
