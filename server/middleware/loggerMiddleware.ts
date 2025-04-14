import {RequestHandler} from "express";
import {logger} from "../helpers/logger";

export const requestLoggerMiddleware : RequestHandler = (req, res, next) =>{
    console.log(req.method, req.path, ' -Body : ', req.body);


    const startTime = new Date();
    const originalSend = res.send;

    res.send = function (body) {
        logger({

            method: req.method,
            path: req.originalUrl,
            requestBody: req.body,
            responseBody: body,
            statusCode: res.statusCode,
            date: startTime.toISOString(),
        });

        // @ts-ignore
        return originalSend.call(this, body);
    };

    next();
}