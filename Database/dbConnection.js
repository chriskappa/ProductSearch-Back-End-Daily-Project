const mongoose = require("mongoose");

// const dbLink = process.env.DATABASE_URL;
// Its Test DB so there is no problem to share it with you :)
const dbLink = DB_LINK;
mongoose
  .connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("Database Logged In"))
  .catch((err) => console.log(err));

module.exports = mongoose;
