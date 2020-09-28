//Express with async/await
const { Pool } = require('pg')

//Connect to our Postgres DB.
const pool = new Pool() //Hard-coding the setting... //Better make an enviroment variable..

module.exports = {
  query: (text, params) => pool.query(text, params),
}