import { ExpressHandler } from "../types";
import {verifyJwt} from "../helpers/auth";
import {db} from "../datastore/DatabaseConnection";

export const authMiddleware: ExpressHandler <any, any> = async (req, res, next) => {

    if(!req.headers.authorization){
        return res.status(403).send({
            error: 'auth token is required'
        });
    }


    // split token
    let token: string[] = req.headers.authorization.split(" ");
    if (!token[1]) {
        return res.status(403).send({
            error: 'auth token is required'
        });
    }

    try {
        const payload = verifyJwt(token[1]);

        //const user = await db.getUserById(payload.userId);
        const user = await db.getUserById(token[1]);

        if (!user) {
            throw 'not found';
        }

        res.locals.userId = user.id;

        next();
    } catch {
        return res.status(401).send({error: 'Bad token !'});
    }


}