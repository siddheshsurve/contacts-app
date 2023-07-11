const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

//middleware : parser to parse body
app.use(express.json());

//adding routing middleware
app.use("/api/contacts", require("./routes/contactRoutes"));

//middleware : error handling
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
