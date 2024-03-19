import { LogStatusEnum } from '@core/lib/logger/enums/log-status.enum';

/**
 * Class representing a log model with various log details.
 */
export class LogModel {
    /**
     * Log status level.
     * @type {LogStatusEnum}
     */
    level: LogStatusEnum;

    /**
     * Log tag.
     * @type {any}
     */
    tag: any;

    /**
     * Log message.
     * @type {any}
     */
    message: any;

    /**
     * Log duration.
     * @type {any}
     */
    duration: any;

    /**
     * Log data.
     * @type {any}
     */
    data: any;

    /**
     * Log enable flag. Can be `null` if not set.
     * @type {boolean | null}
     */
    enable: boolean | null = null;

    /**
     * Constructs a LogModel instance with optional initial log details.
     * @param {LogStatusEnum} level - Log status level (default is INFO).
     * @param {any} tag - Log tag (default is an empty string).
     * @param {any} message - Log message (default is an empty string).
     * @param {any} data - Log data (default is an empty string).
     */
    constructor(
        level: LogStatusEnum = LogStatusEnum.INFO,
        tag: any = '',
        message: any = '',
        data: any = ''
    ) {
        this.setLevel(level);
        this.setTag(tag);
        this.setMessage(message);
        this.setData(data);
    }

    /**
     * Sets the log status level.
     * @param {LogStatusEnum} data - Log status level.
     */
    setLevel(data: LogStatusEnum): void {
        this.level = data;
    }

    /**
     * Sets the log tag.
     * @param {any} data - Log tag.
     */
    setTag(data: any): void {
        this.tag = data;
    }

    /**
     * Sets the log message.
     * @param {any} data - Log message.
     */
    setMessage(data: any): void {
        this.message = data;
    }

    /**
     * Sets the log duration.
     * @param {any} data - Log duration.
     */
    setDuration(data: any): void {
        this.duration = data;
    }

    /**
     * Sets the log data.
     * @param {any} data - Log data.
     */
    setData(data: any): void {
        this.data = data;
    }

    /**
     * Sets the log enable flag.
     * @param {boolean | null} data - Log enable flag.
     */
    setEnable(data: boolean | null): void {
        this.enable = data;
    }

    /**
     * Retrieves the log values as an object.
     * @returns {object} - Object containing log values.
     */
    public getValues(): object {
        return {
            level: this.level,
            message: this.message,
            duration: this.duration,
            data: this.data,
            enable: this.enable,
        };
    }
}
