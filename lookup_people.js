const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let input = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE last_name=$1 OR first_name=$1;", [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    outputMsg(result);
    client.end();
  });
});

function outputMsg (result) {
  console.log("Searching ...");
  const count = result.rows.length;
  result.rows.forEach((row) => {
      let msg = `Found ${count} person(s) by the name '${input}': \n- ${row.id}, ${row.first_name} ${row.last_name}, born '${row.birthdate}'`;
      console.log(msg);
  });
}