const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

// app.get("/api/contacts", (req, res) => {
//     res.status(200).json({message : "Get all contacts"});
// })

//adding middleware
app.use("/api/contacts", require("./routes/contactRoutes"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
