module.exports = {
    level: process.env.LOG_LEVEL || 'info',
    fileName: process.env.LOG_FILE_NAME || 'app-%DATE%.log',
    dirName: process.env.LOG_DIR_NAME || 'logs',
    dirPath: process.env.LOG_DIR_PATH || 'src/storage/logs',
    datePattern: process.env.LOG_DATE_PATTERN || 'YYYY-MM-DD',
    dateFormat: process.env.LOG_DATE_FORMAT || 'YYYY-MM-DD HH:mm:ss',
};
