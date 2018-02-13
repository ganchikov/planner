export class ConsoleLogger {
    constructor (private subject: string, private enabled: Boolean) {
    }

    set Enabled (value: boolean) {
        this.enabled = value;
    }

    Log(message: string) {
        if (this.enabled) {
            console.log(`${this.subject} [${new Date(Date.now()).toLocaleTimeString()}]: ${message}`);
        }
    }
}
