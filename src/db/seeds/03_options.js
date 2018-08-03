const table = 'options'
exports.seed = knex => {
  return knex(table).insert([{
      id: 1,
      categoryId: 'A',
      name: 'Arts, Culture and Humanities'
    }, {
      id: 2,
      categoryId: 'B',
      name: 'Educational Institutions and Related Activities'
    }, {
      id: 3,
      categoryId: 'C',
      name: 'Environmental Quality, Protection and Beautification'
    }, {
      id: 4,
      categoryId: 'D',
      name: 'Animal-Related'
    }, {
      id: 5,
      categoryId: 'N',
      name: 'Recreation, Sports, Leisure, Athletics'
    },
    {
      id: 6,
      categoryId: 'O',
      name: 'Youth Development'
    }, {
      id: 7,
      categoryId: 'R',
      name: 'Civil Rights, Social Action, Advocacy'
    }, {
      id: 8,
      categoryId: 'S',
      name: 'Community Improvement, Capacity Building'
    }, {
      id: 9,
      categoryId: 'U',
      name: 'Science and Technology Research Institutes, Services'
    }, {
      id: 10,
      categoryId: 'X',
      name: 'Religion-Related, Spiritual Development'
    }
  ]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  })
};