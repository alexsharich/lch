import {NextFunction, Request, Response} from "express";
import {HttpStatus} from "../core/types/http-statuses";
import {jwtService} from "../application/jwtService";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        res.sendStatus(HttpStatus.Unauthorized);
        return;
    }

    const parts = auth.split(' ');
    if (parts.length !== 2) {
        res.sendStatus(HttpStatus.Unauthorized);
        return;
    }

    const token = parts[1];

    const result = jwtService.verifyToken(token);

    if (result && result.userId) {
        req.userId = result.userId;
        next();
    } else {
        res.sendStatus(HttpStatus.Unauthorized);
    }
};