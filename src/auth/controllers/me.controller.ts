import {Request, Response} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {usersQueryRepository} from "../../users/repositories/users.query.repository";

export const meHandler = async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
        res.sendStatus(HttpStatus.Unauthorized);
        return;
    }

    try {
        const user = await usersQueryRepository.findUser(userId);

        if (!user) {
            res.sendStatus(HttpStatus.Unauthorized);
            return;
        }

        res.status(HttpStatus.Ok).send({
            email: user.email,
            login: user.login,
            userId: user.id
        });

    } catch (error) {
        console.error("Me handler error:", error);
        res.sendStatus(HttpStatus.InternalServerError);
    }
}