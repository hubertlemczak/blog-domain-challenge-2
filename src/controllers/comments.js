const model = require('../models/comments');
const {
  generalErrors,
  postsErrors,
  commentsErrors,
} = require('../utils/errors');
const { SUCCESS } = require('../utils/vars');

const createComment = async (req, res) => {
  const userId = req.body.userId;
  const { content } = req.body;
  const postId = parseInt(req.params.postId);

  if (!userId || !content) {
    return generalErrors(res, 400);
  }

  const [status, dbRes] = await model.createComment(postId, userId, content);

  if (status === SUCCESS) {
    return res.status(201).json({ comment: dbRes });
  }

  if (dbRes === 'P2003') {
    return postsErrors(res, 404);
  }

  generalErrors(res, 500);
};

const createReplyComment = async (req, res) => {
  const userId = req.body.userId;
  const { content } = req.body;
  const postId = parseInt(req.params.postId);
  const commentId = parseInt(req.params.commentId);

  if (!userId || !content) {
    return generalErrors(res, 400);
  }

  const [status, dbRes] = await model.createReplyComment(
    postId,
    commentId,
    userId,
    content
  );

  if (status === SUCCESS) {
    return res.status(201).json({ comment: dbRes });
  }

  if (dbRes === 'P2003') {
    return commentsErrors(res, 404);
  }

  generalErrors(res, 500);
};

const updateComment = async (req, res) => {
  const userId = req.body.userId;
  const { content } = req.body;
  const postId = parseInt(req.params.postId);
  const commentId = parseInt(req.params.commentId);

  if (!userId || !content) {
    return generalErrors(res, 400);
  }

  const [status, dbRes] = await model.updateComment(
    postId,
    commentId,
    userId,
    content
  );

  if (status === SUCCESS) {
    return res.status(201).json({ comment: dbRes });
  }

  if (dbRes === 'P2025') {
    return commentsErrors(res, 404);
  }

  generalErrors(res, 500);
};

const deleteComment = async (req, res) => {
  const commentId = parseInt(req.params.commentId);

  const [status, dbRes] = await model.deleteComment(commentId);

  if (status === SUCCESS) {
    return res.status(201).json({ comment: dbRes });
  }

  if (dbRes === 'P2025') {
    return commentsErrors(res, 404);
  }

  generalErrors(res, 500);
};

module.exports = {
  createComment,
  createReplyComment,
  updateComment,
  deleteComment,
};
