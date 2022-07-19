const { server } = require("./src/app.js");
const { conn } = require("./src/database/db");
const { administrator } = require("./src/Models/utils/Admin");
const { loadFakeDatabase } = require("./src/database/fake");

const PORT = process.env.PORT || 3001;
// Syncing all the models at once.
conn
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, async () => {
      //init admin
      await administrator();
      await loadFakeDatabase();
      console.log(`% listening at ${PORT}`); // eslint-disable-line no-console
    });
  })
  .catch((e) => console.error("error opening server: " + e.message));
