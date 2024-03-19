export class ResponseTime {
    protected startTime: any;

    protected endTime: any;

    constructor() {
        this.startTime = 0;
        this.endTime = 0;
    }

    start(): void {
        this.startTime = new Date();
    }

    end(): void {
        this.endTime = new Date();
    }

    duration(): number {
        return this.endTime - this.startTime;
    }
}
