const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host     : settings.hostname,
    user     : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const printPeople = function (result) {
  console.log(`Found ${result.length} person(s) by the name '${process.argv.slice(2)[0]}'`);
};

const printPerson = function (result) {
  result.forEach((result) => {
    console.log(`-${result.id}: ${result.first_name} ${result.last_name}, born '${result.birthdate.toString().substring(4, 15)}' `);
  });
};

knex.select().from('famous_people').asCallback((err, result) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching ...");
  knex.select().from('famous_people').where(function(){
    this.where('first_name', process.argv.slice(2)[0]).orWhere('last_name', process.argv.slice(2)[0])
  }).asCallback((err, result) => {
    if (err) {
      return console.error("Error running query", err);
    }
    printPeople(result);
    printPerson(result);
  }).then(() => {
    knex.destroy();
  });
});


