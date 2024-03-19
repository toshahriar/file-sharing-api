module.exports = {
    mysql: {
        dialect: process.env.DB_CONNECTION || 'mysql',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || '3306',
        database: process.env.DB_DATABASE || 'file_manager',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'secret',
        timezone: '+06:00',
        pool: {
            max: 5,
            min: 0,
            idle: 10 * 1000,
        },
        logging: false,
        define: {
            timestamps: true,
            underscored: true,
        },
    },
};
