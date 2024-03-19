module.exports = {
    name: process.env.APP_NAME || 'File Manager',
    env: process.env.APP_ENV || 'development',
    debug: JSON.parse(process.env.APP_DEBUG || 'false'),
    version: process.env.APP_VERSION || '1.0.0',
    protocol: process.env.APP_PROTOCOL || 'http',
    host: process.env.APP_HOST || 'localhost',
    httpPort: process.env.APP_HTTP_PORT || 3000,
    httpsPort: process.env.APP_HTTPS_PORT || 3001,
};
