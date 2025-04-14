
import {db, initDatabaseConnection} from './datastore/DatabaseConnection';

import express, {ErrorRequestHandler, request, RequestHandler} from 'express';
import {createPostHandler, listPostsHandler} from "./handlers/postHandler";
import asyncHandler from "express-async-handler"
import {signInHandler, signUpHandler} from "./handlers/authHandller";
import {requestLoggerMiddleware} from "./middleware/loggerMiddleware";
import {errHandler} from "./middleware/errorMiddleware";
import dotenv from 'dotenv';
import {authMiddleware} from "./middleware/authMiddleware";
import setupSwagger from "./swagger";

(async () => {


    /*await initDatabaseConnection();*/
    dotenv.config();

    const app = express();
    app.use(express.json());

    setupSwagger(app);


    // log req for all Apis
    app.use(requestLoggerMiddleware);

    // Public Apis
    app.get('/healthz', (req, res) => res.send({
        status: 'Ok, Work successfully'
    }));

    app.post('/signup', asyncHandler(signUpHandler));
    app.post('/signin', asyncHandler(signInHandler));

    // middleware for auth
    app.use(authMiddleware);

    // Auth Apis
    app.get('/posts', asyncHandler(listPostsHandler));
    app.post('/create_post', asyncHandler(createPostHandler));




    app.use(errHandler);
    app.listen(process.env.PORT || 3000);

})();




