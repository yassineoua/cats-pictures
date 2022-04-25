import { Knex } from 'knex';

const bcrypt = require('bcryptjs');

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  const encryptedPassword = await bcrypt.hash('test_user', 10);

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
      firstname: 'test_user',
      lastname: 'test_user',
      email: 'test_user@example.com',
      password: encryptedPassword,
    },
  ]);
}
