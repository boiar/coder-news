import {ErrorRequestHandler, RequestHandler} from "express";

// TODO Mets Why we define function like this shape
export const errHandler: ErrorRequestHandler = (err, req, res,next) => {
    console.error('Uncaught Exception', err);
    return res.status(500).send('Oops, an unexpected error occurred, please try again !' );
}


