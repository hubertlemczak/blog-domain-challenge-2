const model = require('../models/reactions');
const {
  generalErrors,
  postsErrors,
  commentsErrors,
  reactionsErrors,
} = require('../utils/errors');
const { SUCCESS } = require('../utils/vars');

const createReaction = async (req, res) => {
  const { userId, type } = req.body;
  const postId = parseInt(req.params.postId);

  if (!userId || !type) {
    return generalErrors(res, 400);
  }

  const [status, dbRes] = await model.createReaction(postId, userId, type);

  if (status === SUCCESS) {
    return res.status(201).json({ reaction: dbRes });
  }

  if (dbRes === 409) {
    return reactionsErrors(res, 409);
  }

  if (dbRes === 'P2003') {
    return postsErrors(res, 404);
  }

  generalErrors(res, 500);
};

const deleteReaction = async (req, res) => {
  const reactionId = parseInt(req.params.reactionId);

  const [status, dbRes] = await model.deleteReaction(reactionId);

  if (status === SUCCESS) {
    return res.status(201).json({ reaction: dbRes });
  }

  if (dbRes === 'P2025') {
    return commentsErrors(res, 404);
  }

  generalErrors(res, 500);
};

module.exports = {
  createReaction,
  deleteReaction,
};
