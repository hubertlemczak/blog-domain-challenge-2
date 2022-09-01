const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const createdUser = await prisma.user.create({
    data: {
      username: 'berto',
      email: 'hubert@gmail.com',
      password: 'pass123321',
      profile: {
        create: {
          firstName: 'Hubert',
          lastName: 'Lemczak',
          age: 21,
          pictureUrl: 'somepic.com',
        },
      },
      comments: {
        create: [
          {
            content: 'my parent comment',
          },
        ],
      },
    },
    include: {
      profile: true,
      comments: true,
    },
  });

  const createdComment = await prisma.comment.create({
    data: {
      content: 'my second parent comment',
      userId: createdUser.id,
      replies: {
        create: [{ content: 'reply', userId: createdUser.id }],
      },
    },
    include: { replies: true },
  });

  const allUsers = await prisma.user.findMany({
    include: {
      comments: true,
    },
  });

  console.log(createdUser);
  console.log(createdComment);
  console.log(JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
