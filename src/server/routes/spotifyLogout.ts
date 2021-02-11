import {Request, Response} from "express";
import {Cookies} from "../constants/cookies";

export const logout = (_req: Request, res: Response) => {
    res.clearCookie(Cookies.ACCESS_TOKEN);
    res.clearCookie(Cookies.REFRESH_TOKEN);
    res.clearCookie(Cookies.STATE_KEY);

    res.redirect('/');
};