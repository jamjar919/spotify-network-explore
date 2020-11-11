import express from "express";
import dotenv from "dotenv";
import {root, clientJavascript} from "./routes/root";

dotenv.config();
const app = express();
const port = process.env.PORT || 80;
app.use(express.static('public'));

app.get('/', root);
app.get('/client.js', clientJavascript);

app.listen(port, () => {
    console.log(`Active on port ${port}!`)
});