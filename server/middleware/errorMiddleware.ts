import {ErrorRequestHandler, RequestHandler} from "express";
import {logger} from "../helpers/logger";

// TODO Mets Why we define function like this shape
export const errHandler: ErrorRequestHandler = (err, req, res,next) => {
    console.error('Uncaught Exception', err);


    const startTime = new Date();
    const originalSend = res.send;

    res.send = function (body) {
        logger({
            level: 'error',
            method: req.method,
            path: req.originalUrl,
            requestBody: req.body,
            responseBody: { error: err.message || 'Internal Server Error' },
            statusCode: 500,
            date: startTime.toISOString()
        });

        // @ts-ignore
        return originalSend.call(this, body);
    };


    return res.status(500).send('Oops, an unexpected error occurred, please try again !' );
}


