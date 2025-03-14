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
    },
    include: {
      profile: true,
    },
  });

  await prisma.category.createMany({
    data: [
      {
        name: 'funny',
      },
      {
        name: 'programming',
      },
    ],
  });

  const createdPost = await prisma.post.create({
    data: {
      title: 'my first post',
      content: 'my first post content',
      imageUrl: 'image.com/img',
      userId: createdUser.id,
      categories: {
        connect: [{ name: 'funny' }, { name: 'programming' }],
      },
    },
    include: {
      categories: true,
    },
  });

  setTimeout(() => {}, 1000);
  const createdPost2 = await prisma.post.create({
    data: {
      title: 'my second post',
      content: 'my second post content',
      imageUrl: 'image.com/img',
      userId: createdUser.id,
      categories: {
        connect: [{ name: 'programming' }],
      },
    },
    include: {
      categories: true,
    },
  });

  const createdComment = await prisma.comment.create({
    data: {
      content: 'my second parent comment',
      userId: createdUser.id,
      postId: createdPost.id,
      replies: {
        create: [
          { content: 'reply', userId: createdUser.id, postId: createdPost.id },
          {
            content: 'reply number 2',
            userId: createdUser.id,
            postId: createdPost.id,
          },
        ],
      },
    },
    include: { replies: true },
  });

  const createdReactionType = await prisma.reactionType.create({
    data: {
      name: 'like',
    },
  });

  const createdReaction = await prisma.reaction.create({
    data: {
      postId: createdPost.id,
      userId: createdUser.id,
      type: 'like',
    },
    include: {
      reactionType: true,
    },
  });

  console.log(createdUser);
  console.log(createdPost);
  console.log(createdPost2);
  console.log(createdComment);
  console.log(createdReactionType);
  console.log(createdReaction);
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
