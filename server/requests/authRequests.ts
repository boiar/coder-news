import {User} from "../types";

export type SignUpRequest = Pick<User, 'email' | 'firstName' | 'lastName' | 'username' | 'password'>;

export interface SignInRequest {
    email_or_username: string,
    password: string,
}

