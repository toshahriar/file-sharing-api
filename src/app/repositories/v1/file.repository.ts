import moment from 'moment';
import { Model, Op } from 'sequelize';
import { File as FileModel } from '@app/models';
import { AbstractDatabaseRepository } from '@core/lib/sequelize/abstracts';

/**
 * Repository class for handling File model operations.
 *
 * @class FileRepository
 * @extends AbstractDatabaseRepository
 */
export class FileRepository extends AbstractDatabaseRepository {
    /**
     * The Sequelize model associated with this repository.
     *
     * @protected
     * @type any
     */
    protected model: any;

    /**
     * Creates an instance of FileService.
     */
    constructor(model: Model = null) {
        super();

        if (model) {
            this.model = model;
        } else {
            this.model = FileModel;
        }
    }

    /**
     * Retrieves files older than the specified retention period.
     *
     * @param {number} retentionPeriod - The retention period in days.
     * @returns {Promise<any[]>} A Promise that resolves with an array of files.
     */
    async getOlderFiles(retentionPeriod: number): Promise<any[]> {
        const retentionDate: any = moment().subtract(retentionPeriod, 'days').toDate();
        return this.findWhere({
            createdAt: {
                [Op.lt]: retentionDate,
            },
        });
    }
}
