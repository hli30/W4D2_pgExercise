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

let input = process.argv[2];

function outputMsg (rows) {
  console.log("Searching ...");
  const count = rows.length;
  console.log(`Found ${count} person(s) by the name '${input}': `);
  rows.forEach((row) => {
      let msg = `- ${row.id}, ${row.first_name} ${row.last_name}, born '${row.birthdate}'`;
      console.log(msg);
  });
}

knex("famou_people")
  .where("first_name", input)
  .orWhere("last_name", input)
  .then((result) => {
    outputMsg(result);
  })
  .catch((err) => {
    console.log(err);
  });


