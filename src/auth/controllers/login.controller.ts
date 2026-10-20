import {Response, Request} from "express";

export type InputLoginType = {
    loginOrEmail: string,
    password: string
}

export function loginHandler(req: Request<{},{},InputLoginType>, res: Response) {

}