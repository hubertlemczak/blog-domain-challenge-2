const model = require('../models/posts');

const createComment = async (req, res) => {
  res.send('comments endpoint');
};

module.exports = { createComment };
