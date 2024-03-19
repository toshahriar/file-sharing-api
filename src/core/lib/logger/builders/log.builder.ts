import { LogModel } from '@core/lib/logger/models/log.model';
import { LogStatusEnum } from '@core/lib/logger/enums/log-status.enum';
import { config } from '@core/lib/config';

const winston = require('winston');
require('winston-daily-rotate-file');

/**
 * Class for building and logging structured log messages using Winston.
 * Supports console and file transports based on configuration.
 */
export class LogBuilder {
    /**
     * The internal model used to store log details during the building process.
     *
     * @private
     * @type {LogModel}
     */
    private model: LogModel;

    /**
     * Constructs a LogBuilder instance with initial log details.
     *
     * @param {LogStatusEnum} level - Log level.
     * @param {string} tag - Log tag.
     * @param {string} message - Log message.
     * @param {any} data - Log data.
     */
    constructor(level: any, tag: any, message: any, data: any) {
        this.reset();
        this.model.setLevel(level);
        this.model.setTag(tag);
        this.model.setMessage(message);
        this.model.setData(data);
    }

    /**
     * Formats the log message for Winston's printf.
     *
     * @param {any} info - Log information.
     * @returns {string} - Formatted log message.
     * @private
     */
    private static formatLog(info: {
        timestamp: any;
        level: any;
        tag: any;
        message: any;
        duration: any;
        data: any;
    }): string {
        const logBody = JSON.stringify({
            tag: info.tag,
            message: info.message,
            duration: info.duration ?? null,
            data: info.data ?? {},
        });

        return `${info.level} [${[info.timestamp]}] ${logBody}`;
    }

    /**
     * Sets the log level.
     *
     * @param {LogStatusEnum} value - Log level.
     * @returns {this} - The LogBuilder instance for method chaining.
     */
    public level(value: LogStatusEnum): this {
        this.model.setLevel(value);
        return this;
    }

    /**
     * Sets the log tag.
     *
     * @param {string} value - Log tag.
     * @returns {this} - The LogBuilder instance for method chaining.
     */
    public tag(value: string): this {
        this.model.setTag(value);
        return this;
    }

    /**
     * Sets the log message.
     *
     * @param {string} value - Log message.
     * @returns {this} - The LogBuilder instance for method chaining.
     */
    public message(value: string): this {
        this.model.setMessage(value);
        return this;
    }

    /**
     * Sets the log duration.
     *
     * @param {any} value - Log duration.
     * @returns {this} - The LogBuilder instance for method chaining.
     */
    public duration(value: any): this {
        this.model.setDuration(value);
        return this;
    }

    /**
     * Sets the log data.
     *
     * @param {any} value - Log data.
     * @returns {this} - The LogBuilder instance for method chaining.
     */
    public data(value: any): this {
        this.model.setData(value);
        return this;
    }

    /**
     * Sets the log enable flag.
     *
     * @param {boolean} value - Log enable flag.
     * @returns {this} - The LogBuilder instance for method chaining.
     */
    public enable(value: boolean): this {
        this.model.setEnable(value);
        return this;
    }

    /**
     * Logs the structured log message based on the configured settings.
     */
    public log(): void {
        if (this.model.enable == null || this.model.enable) {
            this.console();
            this.file();
        }
    }

    /**
     * Logs an information-level log message.
     */
    public info(): void {
        this.model.setLevel(LogStatusEnum.INFO);
        this.log();
    }

    /**
     * Logs a warning-level log message.
     */
    public warn(): void {
        this.model.setLevel(LogStatusEnum.WARN);
        this.log();
    }

    /**
     * Logs an error-level log message.
     */
    public error(): void {
        this.model.setLevel(LogStatusEnum.ERROR);
        this.log();
    }

    /**
     * Logs a debug-level log message.
     */
    public debug(): void {
        this.model.setLevel(LogStatusEnum.DEBUG);
        this.log();
    }

    /**
     * Resets the log builder state to its initial values.
     *
     * @private
     * @returns {this} - The LogBuilder instance for method chaining.
     */
    private reset(): this {
        this.model = new LogModel();
        return this;
    }

    /**
     * Configures and writes log messages to the console transport.
     *
     * @private
     */
    private console(): void {
        const logger = winston.createLogger({
            level: config('log.level', LogStatusEnum.INFO),
            transports: [new winston.transports.Console()],
            format: winston.format.combine(
                winston.format.timestamp({
                    format: config('log.dateFormat', 'YYYY-MM-DD HH:mm:ss'),
                }),
                winston.format.printf(LogBuilder.formatLog)
            ),
        });

        this.write(logger);
    }

    /**
     * Configures and writes log messages to the file transport.
     *
     * @private
     */
    private file(): void {
        const logger = winston.createLogger({
            level: config('log.level', LogStatusEnum.INFO),
            transports: [
                new winston.transports.DailyRotateFile({
                    filename: config('log.fileName', 'app-%DATE%.log'),
                    dirname: config('log.dirPath', 'src/storage/logs'),
                    datePattern: config('log.datePattern', 'YYYY-MM-DD'),
                    prepend: true,
                    level: this.model.level,
                }),
            ],
            format: winston.format.combine(
                winston.format.timestamp({
                    format: config('log.dateFormat', 'YYYY-MM-DD HH:mm:ss'),
                }),
                winston.format.printf(LogBuilder.formatLog)
            ),
        });

        this.write(logger);
    }

    /**
     * Writes the log message using the specified logger instance.
     *
     * @param {any} logger - Winston logger instance.
     * @private
     */
    private write(logger: any): void {
        const logObj = {
            level: this.model.level,
            tag: this.model.tag,
            message: this.model.message,
            duration: this.model.duration,
            data: this.model.data,
        };

        switch (this.model.level) {
            case LogStatusEnum.WARN:
                logger.warn(logObj);
                break;
            case LogStatusEnum.ERROR:
                logger.error(logObj);
                break;
            case LogStatusEnum.DEBUG:
                logger.debug(logObj);
                break;
            case LogStatusEnum.INFO:
            default:
                logger.info(logObj);
        }
    }
}
