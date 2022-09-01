const prisma = require('../utils/prisma');

const { FAILED, SUCCESS } = require('../utils/vars');

const createUser = async ({
  username,
  email,
  password,
  firstName,
  lastName,
  age,
  pictureUrl,
}) => {
  try {
    const dbRes = await prisma.user.create({
      data: {
        username,
        email,
        password,
        profile: {
          create: {
            firstName,
            lastName,
            age,
            pictureUrl,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return [SUCCESS, dbRes];
  } catch (error) {
    console.error('[DATABASE]', error);
    return [FAILED, error.code];
  }
};

const updateUser = async (
  { username, email, password, firstName, lastName, age, pictureUrl },
  id
) => {
  try {
    const dbRes = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        email,
        password,
        profile: {
          update: {
            firstName,
            lastName,
            age,
            pictureUrl,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return [SUCCESS, dbRes];
  } catch (error) {
    console.error('[DATABASE]', error);
    return [FAILED, error.code];
  }
};

const deleteUser = async id => {
  try {
    const dbRes = await prisma.user.delete({
      where: {
        id,
      },
      include: { profile: true },
    });

    return [SUCCESS, dbRes];
  } catch (error) {
    console.error('[DATABASE]', error);
    return [FAILED, error.code];
  }
};

module.exports = { createUser, updateUser, deleteUser };
