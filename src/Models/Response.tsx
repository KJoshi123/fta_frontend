export default class Response {
    public statuscode: number;
    public data: any;
    public message: string;
    public Exception: string;

    constructor(statuscode: number, data: any, message: string, exception: string) {
        this.statuscode = statuscode;
        this.data = data;
        this.message = message;
        this.Exception = exception;
    }

}