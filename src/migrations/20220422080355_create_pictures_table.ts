import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('pictures', function (table) {
    table.increments('id');
    table.string('url', 255).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('pictures');
}
