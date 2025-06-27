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
        firstName: 'Shakeel',
        lastName: 'Ahamed',
        email: 'sakmbd@gmail.com',
        password: hashedPassword,
        role: 'Admin',
        address: {
            street: 'Aslampur',
            city: 'Sambhal',
            state: 'Uttar Pradesh',
            postalCode: '244303',
            country: 'India'
        },
        createdAt: new Date(),
        updatedAt: new Date()
    });
};

/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export const down = async (db, client) => {
    await db.collection('users').deleteOne({ email: 'sakmbd@gmail.com' });
};
