import express, {Request, Response} from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.SPOTIFY_NETWORK_PORT || 80;

app.get('/', (req: Request, res: Response) => {
    const data: number = 1;
    res.send({ data })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});