import {User} from "../types";

export interface SignUpResponse {}


export type SignInResponse = {
    user: Pick<User, 'email' | 'firstName' | 'lastName' | 'username' | 'id'>
    jwt : string
}
