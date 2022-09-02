const prisma = require('../utils/prisma');
const { FAILED, SUCCESS } = require('../utils/vars');

const getAllCategories = async () => {
  try {
    const dbRes = await prisma.category.findMany();

    return [SUCCESS, dbRes];
  } catch (error) {
    console.error(error);
    return [FAILED, error.code];
  }
};

const createCategory = async name => {
  try {
    const dbRes = await prisma.category.create({
      data: {
        name,
      },
    });

    return [SUCCESS, dbRes];
  } catch (error) {
    console.error(error);
    return [FAILED, error.code];
  }
};

const updateCategory = async (id, name) => {
  try {
    const dbRes = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return [SUCCESS, dbRes];
  } catch (error) {
    console.error(error);
    return [FAILED, error.code];
  }
};

const deleteCategory = async id => {
  try {
    const dbRes = await prisma.category.delete({
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
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
