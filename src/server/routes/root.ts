import * as path from "path";
import {Request, Response} from "express";

export const root = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/client/index.html'));
};

export const clientJavascript = (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname + '/client/client.js'));
};
