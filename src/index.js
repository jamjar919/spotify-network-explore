const express = require('express')
const app = express();
const port = 8000;

app.get('/', (req, res) => {
    res.send({ data: "something else" })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});