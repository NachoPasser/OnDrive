const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { initAdmin } = require("./src/Models/utils/Admin");

const PORT = process.env.PORT || 3001;
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    //init admin
    await initAdmin();
    console.log(`% listening at ${PORT}`); // eslint-disable-line no-console
  });
});
