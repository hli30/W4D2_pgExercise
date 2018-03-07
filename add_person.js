const settings = require("./settings");
const knex = require("knex")({
  client: "pg",
  connection: {
    host: settings.host,
    user: settings.user,
    password : settings.password,
    database : settings.database
  }
});

let inputFirstName = process.argv[2];
let inputLastName = process.argv[3];
let inputBirthDate = process.argv[4];

knex("famous_people")
  .insert({first_name: inputFirstName, last_name: inputLastName, birthdate: inputBirthDate})
  .then((row) => {
    console.log("inserted: ", row)
  })
  .catch((err) => {
    console.log(err);
  });
