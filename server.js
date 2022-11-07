const app = require('./app')
const mongoose = require("mongoose");

require("dotenv").config();

const { HOST_DB, PORT = 3000 } = process.env;

async function main() {
  try {
    await mongoose.connect(HOST_DB);
    console.log("connected");

    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    })
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();