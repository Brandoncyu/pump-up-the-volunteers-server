const {hashSync} = require('bcryptjs')

const table = 'organizations'

exports.seed = knex => {
  return knex(table).insert([
    {
      id: 1,
      name: "Experience Learning Community",
      email: 'info@mopop.org',
      password: hashSync('password'),
      ein: 911626784,
      description: "Music and more",
      logo: 'http://scoop.previewsworld.com/Image/NewsImage/4/202621/1157629/1',
      street: "120 6TH AVE N STE 100",
      city: "SEATTLE",
      state: "WA",
      zip: "98109-5002",
      latitude: "47.619471",
      longitude: "-122.344641",
      option_id: 1
    },
    {
      id: 2,
      name: "Seattle Symphony",
      email: "org1@a.com",
      password: hashSync('password'),
      ein: 910667412,
      description: "The Seattle Symphony Unleashes the Power of Music, Brings People Together, and Lifts the Human Spirit.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/11/Seattle_Symphony_logo.jpg",
      street: "200 UNIVERSITY ST",
      city: "SEATTLE",
      state: "WA",
      zip: "98111-3906",
      latitude: "47.608013",
      longitude: "-122.335167",
      option_id: 1
    },
    {
      id: 3,
      name: "Washington STEM",
      email: "org2@a.com",
      password: hashSync('password'),
      ein: 272133169,
      description: "Washington STEM advances excellence, innovation, and equity in science, technology, engineering, and math (STEM) education for all Washington students.",
      logo: "https://blogs.microsoft.com/uploads/sites/5/2011/03/2742.03_2D00_07STEMlogo.jpg",
      street: "210 S HUDSON ST",
      city: "SEATTLE",
      state: "WA",
      zip: "98134-2417",
      latitude: "47.557995",
      longitude: "-122.331024",
      option_id: 2
    }
  ]).then(() => {
    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });;
};
