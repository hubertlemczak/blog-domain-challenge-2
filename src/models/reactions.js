const prisma = require('../utils/prisma');
const { FAILED, SUCCESS } = require('../utils/vars');

const createReaction = async (postId, userId, type) => {
  try {
    const res = await prisma.reaction.findMany({
      where: {
        postId,
      },
      select: {
        userId: true,
      },
    });

    const userReactionExists = res.find(reaction => reaction.userId === userId);

    if (userReactionExists) {
      return [FAILED, 409];
    }

    const dbRes = await prisma.reaction.create({
      data: {
        userId,
        postId,
        type,
      },
      include: {
        post: {
          include: {
            reactions: true,
          },
        },
      },
    });

    return [SUCCESS, dbRes];
  } catch (error) {
    console.error(error);
    return [FAILED, error.code];
  }
};
const deleteReaction = async id => {
  try {
    const dbRes = await prisma.reaction.delete({
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
  createReaction,
  deleteReaction,
};
