require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log("Connection established"))
.catch(err => console.error("MongoDB connection error:", err));

app.use("/book", Books);
app.use("/author", Authors);
app.use("/publication", Publications);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send({ error: err.message || 'Internal Server Error' });
});

app.listen(313, () => console.log('Server running on port 313'));
