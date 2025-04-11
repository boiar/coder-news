import {JwtObject} from "./types";
import jwt from 'jsonwebtoken';

export function signJwt(obj: JwtObject): string {
    return jwt.sign(obj, getJwtSecret(), {
        expiresIn : '15d'  // expires in 15 day
    });
}



// throws on bad jwt token
export function verifyJwt(token: string) :JwtObject {
    return jwt.verify(token, getJwtSecret()) as JwtObject;
}

function getJwtSecret(): string {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret){
        console.log('Missing JWT secret !');
        process.exit();
    }

    return jwtSecret;
}