
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const PORT = process.env.HOST || 3001
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log('% listening at 3001'); // eslint-disable-line no-console
  });
});
