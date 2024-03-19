import { Op } from 'sequelize';

/**
 * Abstract class for handling common database operations.
 *
 * @class AbstractDatabaseRepository
 * @abstract
 */
export abstract class AbstractDatabaseRepository {
    /**
     * The Sequelize model associated with this repository.
     */
    protected abstract model: any;

    /**
     * Paginates records.
     *
     * @param page The page number.
     * @param limit The limit of records per page.
     * @returns A Promise resolving to paginated records.
     */
    async paginate(page: number = 1, limit: number = 10): Promise<any> {
        const offset: number = (page - 1) * limit;
        return this.model.findAll({ offset, limit });
    }

    /**
     * Finds all records with specified fields.
     *
     * @param fields The fields to include in the result.
     * @returns A Promise resolving to found records.
     */
    async findAll(fields: any = []): Promise<any> {
        return this.model.findAll({
            attributes: fields,
        });
    }

    /**
     * Finds a record by its ID.
     *
     * @param id The ID of the record to find.
     * @returns A Promise resolving to the found record.
     */
    async findById(id: any): Promise<any> {
        return this.model.findByPk(id);
    }

    /**
     * Finds a record matching the given conditions.
     *
     * @param where The conditions to match.
     * @param fields The fields to include in the result.
     * @returns A Promise resolving to the found record.
     */
    async findWhere(where: any, fields: any[] = []): Promise<any> {
        const options: { where: any; attributes?: any } = { where: where };

        if (fields.length > 0) {
            options.attributes = fields;
        }

        return this.model.findOne(options);
    }

    /**
     * Finds the first record based on the specified order.
     *
     * @param orderBy The order criteria.
     * @returns A Promise resolving to the found record.
     */
    async first(orderBy: string[][] = [['createdAt', 'ASC']]): Promise<any> {
        const [orderField, orderDirection] = orderBy[0];
        return this.model.findOne({
            order: [[orderField, orderDirection]],
        });
    }

    /**
     * Creates a new record.
     *
     * @param data The data to create the record with.
     * @returns A Promise resolving to the created record.
     */
    async create(data: any): Promise<any> {
        return this.model.create(data);
    }

    /**
     * Inserts multiple records.
     *
     * @param data The data to insert.
     * @returns A Promise resolving to the inserted records.
     */
    async insert(data: any): Promise<any> {
        return this.model.bulkCreate(data);
    }

    /**
     * Updates a record by ID.
     *
     * @param id The ID of the record to update.
     * @param data The data to update.
     * @returns A Promise resolving to the updated record.
     */
    async update(id: any, data: any): Promise<any> {
        await this.model.update(data, {
            where: { id },
        });

        return this.findById(id);
    }

    /**
     * Updates records matching the specified conditions.
     *
     * @param data The data to update.
     * @param where The conditions to match.
     * @returns A Promise resolving to the updated records.
     */
    async updateWhere(data: any, where: any): Promise<any> {
        return await this.model.update(data, {
            where: where,
        });
    }

    /**
     * Updates a record if it exists, otherwise creates a new one.
     *
     * @param data The data to update or create.
     * @param where The conditions to match.
     * @returns A Promise resolving to the updated or created record.
     */
    async updateOrCreate(data: any, where: any): Promise<any> {
        const [record] = await this.model.findOrCreate({ where: where, defaults: data });

        if (!record) {
            await this.model.update(data, { where });
            return this.model.findOne({ where });
        }

        return record;
    }

    /**
     * Upserts records.
     *
     * @param data The data to upsert.
     * @param options The upsert options.
     * @returns A Promise resolving to the upserted records.
     */
    async upsert(data: any, options: any): Promise<any> {
        return this.model.bulkCreate(data, {
            updateOnDuplicate: options,
        });
    }

    /**
     * Deletes a record by ID.
     *
     * @param id The ID of the record to delete.
     * @returns A Promise resolving to the deleted record.
     */
    async delete(id: any): Promise<any> {
        const record = await this.findById(id);

        if (!record) {
            throw new Error('Record not found');
        }

        await record.destroy();

        return record;
    }

    /**
     * Deletes records based on the specified conditions.
     *
     * @param where The conditions to match for deletion.
     * @returns A Promise resolving to the number of deleted records.
     */
    async deleteWhere(where: any): Promise<number> {
        return await this.model.destroy({ where: where });
    }

    /**
     * Searches records based on the provided query.
     *
     * @param query The search query.
     * @returns A Promise resolving to the found records.
     */
    async search(query: { [x: string]: any }): Promise<any> {
        const where: any = Object.keys(query).reduce((conditions: any, key: string) => {
            conditions[key] = { [Op.like]: `%${query[key]}%` };
            return conditions;
        }, {});

        return this.model.findAll({ where });
    }
}
