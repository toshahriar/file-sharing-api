import { config } from '@core/lib/config';
import { logger } from '@core/lib/logger';
import { StorageManager } from '@core/lib/storage';
import { FileRepository } from '@app/repositories/v1';
import { StorageProviderContract } from '@core/lib/storage/contracts';

/**
 * CronService handles cleaning up old files based on the configured retention period.
 */
export class CronService {
    /**
     * Clean up old files based on the configured retention period.
     * @returns {Promise<void>} A Promise that resolves when the cleaning process is complete.
     */
    async cleanOldFiles(): Promise<void> {
        try {
            const retentionPeriodInDays: number = config('storage.fileRetentionPeriod');
            const files: any[] = await this.getOldFiles(retentionPeriodInDays);

            if (files && files.length > 0) {
                await this.deleteFiles(files);
                logger(
                    'cron_job_success',
                    `Deleted old files successfully. Total Files: ${files.length}`
                ).info();
            } else {
                logger('cron_job_success', 'No records found to delete.').info();
            }
        } catch (err: any) {
            this.handleError(err);
        }
    }

    /**
     * Retrieve files older than the specified retention period.
     * @param retentionPeriodInDays The retention period in days.
     * @returns {Promise<any[]>} A Promise that resolves with an array of files older than the retention period.
     */
    private async getOldFiles(retentionPeriodInDays: number): Promise<any[]> {
        const fileRepo: FileRepository = new FileRepository();
        return fileRepo.getOlderFiles(retentionPeriodInDays);
    }

    /**
     * Delete the given files.
     * @param files The array of files to delete.
     * @returns {Promise<void>} A Promise that resolves when all files are deleted.
     */
    private async deleteFiles(files: any[]): Promise<void> {
        const fileRepo: FileRepository = new FileRepository();
        const storage: StorageProviderContract = StorageManager.get(config('storage.default'));

        for (const file of files) {
            const filePath = file.path;
            await fileRepo.delete(file.id);
            await storage.delete(filePath);
        }
    }

    /**
     * Handle errors occurred during the cleaning process.
     * @param err The error object.
     */
    private handleError(err: any): void {
        logger('cron_job_error', `Error cleaning old files: ${err.message}`, err).error();
    }
}
