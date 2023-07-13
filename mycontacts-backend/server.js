const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb(); //host and name displayed in console

const app = express();

const port = process.env.PORT || 5000;

//middleware : parser to parse body
app.use(express.json());

//adding routing middleware
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//middleware : error handling
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
