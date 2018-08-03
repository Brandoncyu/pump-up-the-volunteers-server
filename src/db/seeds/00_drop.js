exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('volunteers').del()
  await knex('address').del()
  await knex('options').del()
  await knex('volunteers_options').del()
  await knex('organizations').del()
};