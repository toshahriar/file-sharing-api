module.exports = {
    default: process.env.FILE_STORAGE || 'local', // drivers: local, aws, gcp
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5') * 1024 * 1024,
    fileRetentionPeriod: parseInt(process.env.FILE_RETENTION_PERTIOD || '7'),
    rateLimit: {
        upload: parseInt(process.env.UPLOAD_RATE_LIMIT || '5'),
        download: parseInt(process.env.DOWNLOAD_RATE_LIMIT || '5'),
    },
    disks: {
        local: {
            path: process.env.FILE_STORAGE_PATH || '/var/www/app/storage/files',
        },
        aws: {
            credentials: {
                accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || 'minio',
                secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || 'miniosecret',
            },
            region: process.env.AWS_S3_REGION || 'us-east-1',
            bucket: process.env.AWS_S3_BUCKET || 'bucket',
            endpoint: process.env.AWS_S3_ENDPOINT || 'http://localhost:9000',
            forcePathStyle: JSON.parse(process.env.AWS_S3_FORCE_PATH_STYLE || 'true'),
            signatureVersion: process.env.AWS_S3_SIGNATURE_VERSION || 'v4',
        },
        gcp: {
            keyFile: process.env.GOOGLE_CLOUD_KEY_FILE || '',
            projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'project-id',
            storageBucket: process.env.GOOGLE_CLOUD_STORAGE_BUCKET || 'storage-bucket',
            storagePathPrefix:
                process.env.GOOGLE_CLOUD_STORAGE_PATH_PREFIX || 'storage-path-prefix',
            storageApiUri: process.env.GOOGLE_CLOUD_STORAGE_API_URI || 'storage-api-uri',
            storageApiEndpoint:
                process.env.GOOGLE_CLOUD_STORAGE_API_ENDPOINT || 'storage-api-endpoint',
        },
    },
};
