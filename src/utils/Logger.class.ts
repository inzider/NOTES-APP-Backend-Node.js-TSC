import fs from 'fs';
import util from 'util';



export enum LogLevel {
    Error = 0,
    Info = 1,
    Verbose = 2,
    Debug = 3,
};


export default class Logger {
    
    static Level: LogLevel = LogLevel.Info;

    static Log(level: LogLevel, ...message: any) {

        if (level <= this.Level) {
            
            let color = '\x1b[3m';

            switch(level) {
                case LogLevel.Error:
                    color = '\x1b[31m';
                    fs.appendFile('logs/logs.txt', `${message} - ${new Date().toLocaleTimeString()}\n`, () => {console.log('Error saved for logs')}); // this.newDate
                    break;

                case LogLevel.Info:
                    color = '\x1b[37m';
                    break;

                case LogLevel.Verbose:
                    color = '\x1b[36m';
                    break;
                    
                case LogLevel.Debug:
                    color = '\x1b[35m';
                    break;
            }
            const text: string = [color, `${new Date().toLocaleTimeString()}`, util.inspect(message, false, 10, false)].join(' ');
            console.log(text);
        }
    }



    
}