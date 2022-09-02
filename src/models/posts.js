const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');
const { SUCCESS, FAILED } = require('../utils/vars');
const { disconnectCategories } = require('./utils');

const getAllPosts = async (pagination, order) => {
  try {
    const dbRes = await prisma.post.findMany({
      ...pagination,
      orderBy: {
        createdAt: order === 'oldest' ? 'asc' : 'desc',
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        comments: {
          distinct: ['userId'],
          include: {
            replies: true,
          },
        },
        categories: true,
      },
    });

    return [SUCCESS, dbRes];
  } catch (error) {
    console.error('[DATABASE]', error);
    return [FAILED, error.code];
  }
};

const getUserPosts = async (userId, pagination) => {
  try {
    await prisma.user.findUniqueOrThrow({ where: { id: userId } });

    const dbRes = await prisma.post.findMany({
      where: {
        userId,
      },
      ...pagination,
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        comments: {
          distinct: ['userId'],
          include: {
            replies: true,
          },
        },
        categories: true,
      },
    });

    return [SUCCESS, dbRes];
  } catch (error) {
    console.error('[DATABASE]', error);
    if (error instanceof Prisma.NotFoundError) {
      return [FAILED, 404];
    }
    return [FAILED, error.code];
  }
};

const createPost = async (userId, { title, content, imageUrl, categories }) => {
  try {
    const dbRes = await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
        userId,
        categories: {
          connectOrCreate: categories?.map(category => {
            return {
              where: { name: category.name },
              create: { name: category.name },
            };
          }),
        },
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        comments: {
          include: {
            replies: true,
          },
        },
        categories: true,
      },
    });

    return [SUCCESS, dbRes];
  } catch (error) {
    console.error('[DATABASE]', error);
    return [FAILED, error.code];
  }
};

const updatePost = async (
  userId,
  postId,
  { title, content, imageUrl, categories }
) => {
  try {
    const disconnect = await disconnectCategories(postId, categories);

    if (disconnect === FAILED) {
      throw { code: 404 };
    }

    await prisma.user.findUniqueOrThrow({ where: { id: userId } });

    const dbRes = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        content,
        imageUrl,
        categories: {
          connectOrCreate: categories?.map(category => {
            return {
              where: { name: category.name },
              create: { name: category.name },
            };
          }),
          disconnect,
        },
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        comments: {
          distinct: ['userId'],
          include: {
            replies: true,
          },
        },
        categories: true,
      },
    });

    return [SUCCESS, dbRes];
  } catch (error) {
    console.error('[DATABASE]', error);
    if (error instanceof Prisma.NotFoundError) {
      return [FAILED, 404];
    }
    return [FAILED, error.code];
  }
};

const deletePost = async (userId, id) => {
  try {
    const dbRes = await prisma.post.delete({
      where: {
        id,
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        comments: {
          distinct: ['userId'],
          include: {
            replies: true,
          },
        },
        categories: true,
      },
    });

    return [SUCCESS, dbRes];
  } catch (error) {
    console.error('[DATABASE]', error);
    return [FAILED, error.code];
  }
};

module.exports = {
  getAllPosts,
  getUserPosts,
  deletePost,
  createPost,
  updatePost,
};
