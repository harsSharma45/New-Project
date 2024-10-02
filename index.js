require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

app.use(express.json());

mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,                      
    useCreateIndex: true
}).then(() => console.log("Connection established"));

app.use("/book", Books);
app.use("/author", Authors);
app.use("/publication", Publications);

app.listen(313, () => console.log('Server running on port 313'));
