const model = require('../models/posts');
const { usersErrors, generalErrors, postsErrors } = require('../utils/errors');
const { formatPostRes, pagination } = require('../utils/funcs');
const { SUCCESS } = require('../utils/vars');

const getAllPosts = async (req, res) => {
  const pages = pagination(req.query.page, req.query.per_page);

  const [status, dbRes] = await model.getAllPosts(pages, req.query.order_by);

  if (status === SUCCESS) {
    return res.status(200).json({
      posts: formatPostRes(dbRes),
    });
  }

  generalErrors(res, 500);
};

const getUserPosts = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const pages = pagination(req.query.page, req.query.per_page);

  const [status, dbRes] = await model.getUserPosts(userId, pages);

  if (status === SUCCESS) {
    return res.status(200).json({
      posts: formatPostRes(dbRes),
    });
  }

  if (dbRes === 404) {
    return usersErrors(res, 404);
  }

  generalErrors(res, 500);
};

const createPost = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { title, content, imageUrl } = req.body;

  if (!title || !content || !imageUrl) {
    return generalErrors(res, 400);
  }

  const [status, dbRes] = await model.createPost(userId, req.body);

  if (status === SUCCESS) {
    return res.status(201).json({
      posts: formatPostRes([dbRes])[0],
    });
  }

  if (dbRes === 'P2003') return usersErrors(res, 404);

  if (dbRes === 'P2002') return postsErrors(res, 409);

  generalErrors(res, 500);
};

const updatePost = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const postId = parseInt(req.params.postId);

  const [status, dbRes] = await model.updatePost(userId, postId, req.body);

  if (status === SUCCESS) {
    return res.status(201).json({
      posts: formatPostRes([dbRes])[0],
    });
  }

  if (dbRes === 'P2002') return postsErrors(res, 409);

  if (dbRes === 404 || dbRes === 'P2025') return postsErrors(res, 404);

  generalErrors(res, 500);
};

const deletePost = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const postId = parseInt(req.params.postId);

  const [status, dbRes] = await model.deletePost(userId, postId);

  if (status === SUCCESS) {
    return res.status(201).json({ post: formatPostRes([dbRes])[0] });
  }

  if (dbRes === 'P2025') {
    return postsErrors(res, 404);
  }

  generalErrors(res, 500);
};

module.exports = {
  getAllPosts,
  getUserPosts,
  deletePost,
  createPost,
  updatePost,
};
