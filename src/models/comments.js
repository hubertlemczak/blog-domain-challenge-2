const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');
const { FAILED, SUCCESS } = require('../utils/vars');

const createComment = async (postId, userId, content) => {
  try {
    const dbRes = await prisma.comment.create({
      data: {
        userId,
        content,
        postId,
      },
    });

    return [SUCCESS, dbRes];
  } catch (error) {
    console.error(error);
    return [FAILED, error.code];
  }
};

const createReplyComment = async (postId, parentId, userId, content) => {
  try {
    const dbRes = await prisma.comment.create({
      data: {
        userId,
        content,
        parentId,
        postId,
      },
    });

    return [SUCCESS, dbRes];
  } catch (error) {
    console.error(error);
    return [FAILED, error.code];
  }
};

const updateComment = async (postId, commentId, userId, content) => {
  try {
    await prisma.post.findUniqueOrThrow({ where: { id: postId } });

    const dbRes = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content,
      },
    });

    return [SUCCESS, dbRes];
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.NotFoundError) {
      return [FAILED, 'P2025'];
    }
    return [FAILED, error.code];
  }
};

const deleteComment = async id => {
  try {
    const dbRes = await prisma.comment.delete({
      where: {
        id,
      },
    });

    return [SUCCESS, dbRes];
  } catch (error) {
    console.error(error);
    return [FAILED, error.code];
  }
};

module.exports = {
  createComment,
  createReplyComment,
  updateComment,
  deleteComment,
};
