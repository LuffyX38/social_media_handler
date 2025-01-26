const app = require("./app");
const connectDb = require("./src/db/Db");

connectDb()
  .then(() => {
    const port = process.env.PORT || 4567;

    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log("error connecting to the database: ",err);
  });
