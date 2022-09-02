const prisma = require('../utils/prisma');
const { FAILED } = require('../utils/vars');

const disconnectCategories = async (postId, categories) => {
  try {
    const postCategories = await prisma.post.findUnique({
      where: { id: postId },
      select: { categories: true },
    });

    const currentCategories = postCategories.categories.map(
      category => category.name
    );
    const bodyCategories = categories.map(category => category.name);
    const toDisconnect = currentCategories.filter(category =>
      bodyCategories.includes(category)
    );

    return toDisconnect.map(category => ({
      name: category,
    }));
  } catch (error) {
    return FAILED;
  }
};

module.exports = { disconnectCategories };
