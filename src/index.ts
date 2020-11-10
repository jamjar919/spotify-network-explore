import express, {Request, Response} from "express";

const app = express();
const port = 8000;

app.get('/', (req: Request, res: Response) => {
    const data: number = 1;
    res.send({ data })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});