const settings = require('./settings'); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host     : settings.hostname,
    user     : settings.user,
    password : settings.password,
    database : settings.database
  }
});

knex.insert({
  first_name: process.argv.slice(2)[0],
  last_name: process.argv.slice(2)[1],
  birthdate: process.argv.slice(2)[2]
})
.into('famous_people')
.then(() => {
  console.log(`Successfully added '${process.argv.slice(2)[0]} ${process.argv.slice(2)[1]}'`);
})
.finally(() => {
  knex.destroy();
});
