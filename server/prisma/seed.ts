import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  const passwordJohn = await bcrypt.hash("password-john", roundsOfHashing);
  const passwordJane = await bcrypt.hash("password-jane", roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: {
      email: "johndoe@mail.com",
    },
    update: {
      password: passwordJohn,
    },
    create: {
      email: "johndoe@mail.com",
      name: "John Doe",
      password: passwordJohn,
    },
  });

  const user2 = await prisma.user.upsert({
    where: {
      email: "janedoe@mail.com",
    },
    update: {
      password: passwordJane,
    },
    create: {
      email: "janedoe@mail.com",
      name: "Jane Doe",
      password: passwordJane,
    },
  });

  const invoice1 = await prisma.invoice.upsert({
    where: { id: 1 },
    update: { user_id: user1.id },
    create: {
      description: "Rental",
      amount: 121.2,
      due_date: new Date(),
      user_id: user1.id,
    },
  });

  const invoice2 = await prisma.invoice.upsert({
    where: { id: 2 },
    update: { user_id: user2.id },
    create: {
      description: "Rental",
      amount: 121.2,
      due_date: new Date(),
      user_id: user2.id,
    },
  });

  console.log({ invoice1, invoice2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
