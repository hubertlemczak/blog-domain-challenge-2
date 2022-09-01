const model = require('../models/posts');

const getAllPosts = async (req, res) => {
  res.send('post endpoint');
};

module.exports = { getAllPosts };
