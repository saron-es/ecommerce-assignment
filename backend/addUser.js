import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const user = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'Admin', // MUST be exactly "Admin"
    },
  });

  console.log('✅ User created:', user);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
