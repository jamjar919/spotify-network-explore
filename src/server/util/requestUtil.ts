import {Request} from "express";
import {Cookies} from "../constants/cookies";

export const getAccessTokenFromRequest = (req: Request): string => {
    if (req.cookies && req.cookies[Cookies.ACCESS_TOKEN]) {
        return req.cookies[Cookies.ACCESS_TOKEN] as string;
    }
    throw new Error("Access token not present");
};
