const {hashSync} = require('bcryptjs')

const table = 'events'

exports.seed = knex => {

  return knex(table).insert([{
    id: 1,
    title: "POP+WINGS, WANDS, & WIZARDS",
    description: "Join us for a magical day of fantasy-themed fun. Transform into a magical character of your own design with wand making, enchanted creature coloring, and fairy crown crafting with Emerald City Comic Con.",
    date: "08-26-2018",
    street: "120 6TH AVE N STE 100",
    city: "SEATTLE",
    state: "WA",
    zip: "98109-5002",
    day: 'Sunday',
    org_id: 1
  }, {
    id: 2,
    title: "Campout Cinema: Legend",
    description: "A heroic young man must battle the Lord of Darkness in the Campout Cinema screening of Legend (1985).",
    date: "09-14-2018",
    street: "120 6TH AVE N STE 100",
    city: "SEATTLE",
    state: "WA",
    zip: "98109-5002",
    day: "Friday",
    org_id: 1
  }, {
    id: 3,
    title: "MINECON",
    description: "Watch the MINECON Earth Broadcast Live from MoPOP, learn new skills at the education station, hit up the game hub for play time, enjoy panels with creators and YouTubers, check out exclusive gear at the retail shop and more!",
    date: "09-29-2018",
    street: "120 6TH AVE N STE 100",
    city: "SEATTLE",
    state: "WA",
    zip: "98109-5002",
    day: "Saturday",
    org_id: 1
  }]).then(() => {

    return knex.raw(`SELECT setval('${table}_id_seq', (SELECT MAX(id) FROM ${table}));`)
  });;
};
