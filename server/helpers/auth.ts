import crypto from "crypto";
import {JwtObject} from "../types";
import jwt from "jsonwebtoken";


export function hashPassword(password: string): string
{
    return crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT, 42, 64, 'sha512').toString();
}


export function signJwt(obj: JwtObject): string
{
    return jwt.sign(obj, getJwtSecret(), {
        expiresIn : '15d'  // expires in 15 day
    });

}

function getJwtSecret(): string {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret){
        console.log('Missing JWT secret !');
        process.exit(1);
    }

    return jwtSecret;
}


export function verifyJwt(token: string) :JwtObject {
    return jwt.verify(token, getJwtSecret()) as JwtObject;
}