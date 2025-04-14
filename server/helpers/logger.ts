
import winston from 'winston';
import path from 'path';
import fs from 'fs';

import {LogData} from "../types";
import dotenv from "dotenv";


export function logger(logData: LogData ) {
    const now = new Date();
    const timestamp = now.toISOString().slice(0, 13).replace('T', '-');

    const logDir = ensureLogDirectoryExists();

    const logFileName = path.join(logDir, `log-${timestamp}.log`);


    const logInstance = winston.createLogger({
        level: logData.level || 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: logFileName }),
        ],
    });

    logInstance.log({
        level: logData.level || 'info',
        message: 'HTTP Request',
        ...logData,
        date: now.toISOString(),
    });

}


export function ensureLogDirectoryExists():string{

    const logDir = path.join(process.env.LOG_FILE_PATH);

    if (!fs.existsSync(logDir)){
        fs.mkdirSync(logDir, {  recursive: true })
    }

    return logDir;
}


export function dateFormat():string {

    return new Date(Date.now()).toLocaleDateString();
}