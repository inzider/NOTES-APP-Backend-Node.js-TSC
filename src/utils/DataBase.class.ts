import Logger, { LogLevel } from '../utils/Logger.class'
import mongoose from 'mongoose';
import colors from 'colors';



class DataBase {

    private dbUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB1}?authSource=admin`;
    private options = { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false };

    connect() {
        // CONNECTION
        mongoose.connect(this.dbUrl, this.options);

        mongoose.connection.on('connected', () => {
            console.log(colors.red.yellow(`Connected to MongodDB ${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB1}`));
        });

        // ERROR
        mongoose.connection.on('error', (error:any) => {
            Logger.Log(LogLevel.Error ,`MongoDB Error: ${error} `, new Date().toJSON()); 
        });

        // DISCONNECT
        mongoose.connection.on('disconnected', () => {
            Logger.Log(LogLevel.Error ,`MongoDB disconnected! ${process.env.MONGO_DB1} `, new Date().toJSON());
            setTimeout(() => { mongoose.connect(this.dbUrl!, this.options!) }, 10000);
        });

        // RECONNECT
        mongoose.connection.on('reconnected', () => { 
            Logger.Log(LogLevel.Error ,`MongoDB reconnected! ${process.env.MONGO_DB1} `, new Date().toJSON());
        });
    }




}


export default new DataBase();