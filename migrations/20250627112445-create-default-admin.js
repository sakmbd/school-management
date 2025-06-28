import bcrypt from 'bcryptjs';
const saltRounds = 12;

/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export const up = async (db, client) => {
  const hashedPassword = await bcrypt.hash('admin@786', saltRounds);

  await db.collection('users').insertOne({
    firstName: 'Test',
    lastName: 'Admin',
    email: 'example@example.com',
    password: hashedPassword,
    role: 'Admin',
    address: {
      street: 'Test',
      city: 'Test',
      state: 'Test',
      postalCode: '123456',
      country: 'India',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export const down = async (db, client) => {
  await db.collection('users').deleteOne({ email: 'example@example.com' });
};
