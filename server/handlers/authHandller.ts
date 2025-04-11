// noinspection SpellCheckingInspection

import { ExpressHandler } from "../types";
import {SignInRequest, SignInResponse, SignUpRequest, SignUpResponse} from "../api";
import {Post, User} from "../types";
import crypto from "crypto";
import {db} from "../datastore";
import {signJwt} from "../auth";

export const signUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {




    try {

        if(!req.body.email  || !req.body.firstName || !req.body.lastName ||  !req.body.password ) {
            return res.status(400).send({ error: 'Bad request: missing required fields' });
        }

        const username = req.body.firstName +' '+ req.body.lastName;

        const user_existing = await db.getUserByEmail(req.body.email) || await db.getUserByUsername(username);


        if (user_existing){
            return res.status(403).send({ error: 'User already exists' });
        }



        const user: User = {
            id        : crypto.randomUUID(),
            firstName : req.body.firstName,
            lastName  : req.body.lastName,
            username  : username,
            email     : req.body.email,
            password  : hashPassword(req.body.password)
        }


        await db.createUser(user);
        const jwt = signJwt({userId: user.id})

        return res.status(200).send({ jwt });

    } catch (error) {
        console.error('Error while adding user:', error);
        res.status(500).send({ error: 'Internal server error' });
    }

}



export const signInHandler : ExpressHandler<SignInRequest, SignInResponse | { error: string } > = async (req, res) => {

    try {

        const { email_or_username, password } = req.body;

        if(!email_or_username  || !password) {
            return res.status(400).send({ error: 'Bad request: missing required fields'})
        }
        const user_existing = await db.getUserByEmail(email_or_username) || await db.getUserByUsername(email_or_username);




        if (!user_existing || user_existing.password != hashPassword(password)){
            return res.sendStatus(403);
        }

        const jwt = signJwt({ userId: user_existing.id })

        return res.status(200).send({
            user : {
                id: user_existing.id,
                email: user_existing.email,
                username: user_existing.user_name,
                firstName: user_existing.first_name,
                lastName: user_existing.last_name
            },
            jwt : jwt
        })

    } catch (error) {
        console.error('Error while adding post:', error);
        res.sendStatus(500);
    }

}


function hashPassword (password:string): string {
    return crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT, 42, 64, 'sha512').toString('hex');
}