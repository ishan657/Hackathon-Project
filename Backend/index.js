const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT;


app.get("/" ,(req , res) => {
    res.send("Server Started");
});

app.listen(PORT , () => {console.log(`server started at ${PORT}`)});