require('dotenv').config();
import Logger,  {LogLevel} from './utils/Logger.class';
import Express from 'express';

import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
const xss = require ('xss-clean');
import hpp from 'hpp';

import DataBase from './utils/DataBase.class'
import NoteRouter from './controllers/notes.router';


// Set Log Level
Logger.Level = LogLevel.Info;


// Create server
export const app = Express();
export const server = require('http').Server(app);


// Connect to Database
DataBase.connect();


// MiddleWare
app.use(Express.json());
app.use(cors());
app.use(rateLimit({ windowMs: 10 * 60 * 500, max: 500 })); // max 500 req by 5 mins
app.use(helmet()); // set HTTP security response headers
app.use(xss()); // sanitize user input GET POST and PARAMS
app.use(hpp()); // HTTP Parameter Pollution attacks


// Routes
app.use('/notes', NoteRouter);


// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    Logger.Log(LogLevel.Info, `Server started on port ${process.env.PORT}`);
});


// Express Error Handler
app.use( (err: Error, _req:any, res: any, next: any) => {
    if (err) {
        Logger.Log(LogLevel.Error, err);
        res.status(500).send('An error occured!');
    }
    else next();
});