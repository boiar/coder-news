import {RequestHandler} from "express";

export const requestLoggerMiddleware : RequestHandler = (req, res, next) =>{
    console.log(req.method, req.path, ' -Body : ', req.body);
    next();
}