#!/usr/bin/env node
const prisma = require("./client");

async function main() {
  // Seed user data
  await prisma.user.createMany({
    data: [
      {
        email: "aliudn@gmail.com",
        password: "$2b$10$JqCm7hSREeRrLxmfeL8eeeFgIBfgUWcxIvI8VlA4KGWeW3jPwIQBq", // hashed password for "password123"
        name: "Aliudin",
      }
    ],
    skipDuplicates: true,
  });

  console.log("Seeding completed.");

  // Seed product data
  await prisma.product.createMany({
    data: [
      {
        name: "Sample Product 1",
        description: "This is a sample product",
        price: 19.99,
      },
      {
        name: "Sample Product 2",
        description: "This is another sample product",
        price: 29.99,
      },
      {
        name: "Sample Product 3",
        description: "This is yet another sample product",
        price: 39.99,
      },
      {
        name: "Sample Product 4",
        description: "This is a different sample product",
        price: 49.99,
      },
      {
        name: "Sample Product 5",
        description: "This is the fifth sample product",
        price: 59.99,
      }
    ],
    skipDuplicates: true,
  });

  console.log("Product seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });   