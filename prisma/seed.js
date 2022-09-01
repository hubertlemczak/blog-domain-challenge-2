const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const createdUser = await prisma.user.create();

  const allUsers = await prisma.user.findMany();
  console.log(createdUser);
  console.log(allUsers);
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
