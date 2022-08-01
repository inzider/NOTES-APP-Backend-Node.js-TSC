


export interface IResponse {
    success: boolean,
    message:string, 
    data?: {
        _id?: string,
        note?:string,
        status?:string,
        updatedAt?:Date,
    }
};


export default class Response implements IResponse {
    constructor(
        public success: boolean,
        public message:string, 
        public data?: {},
    ) {}
}