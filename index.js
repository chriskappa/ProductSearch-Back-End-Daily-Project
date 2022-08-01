const express = require("express");
const app = express();

const cors = require("cors");
const statisticsControllers = require("./Controllers/statisticsControllers");
/***
 * Creating database Connection
 *  */
//Test
const dbConnection = require("./Database/dbConnection");
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());
app.use("/statistics", statisticsControllers);
app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
