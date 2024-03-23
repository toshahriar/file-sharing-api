import { v4 as uuidv4 } from 'uuid';
import { AbstractDTO } from '@core/abstracts';

/**
 * Data Transfer Object (DTO) for representing file information.
 *
 * @class FileDto
 * @extends AbstractDTO
 */
export class FileDto extends AbstractDTO {
    /**
     * The ID of the file.
     *
     * @type {string}
     */
    public id: string = uuidv4();

    /**
     * The name of the file.
     *
     * @type {string}
     */
    public fileName: string = '';

    /**
     * The path to the file.
     *
     * @type {string}
     */
    public path: string = '';

    /**
     * The size of the file.
     *
     * @type {string}
     */
    public size: string = '';

    /**
     * The MIME type of the file.
     *
     * @type {string}
     */
    public mimeType: string = '';

    /**
     * The public key associated with the file.
     *
     * @type {string}
     */
    public publicKey: string = '';

    /**
     * The private key associated with the file.
     *
     * @type {string}
     */
    public privateKey: string = '';

    /**
     * The signature associated with the file.
     *
     * @type {string}
     */
    public signature: string = '';

    /**
     * The IP address associated with the file.
     *
     * @type {string}
     */
    public ipAddress: string = '';

    /**
     * Constructs a new FileDto instance.
     *
     * @param {any} data - The data to initialize the FileDto with.
     */
    constructor(data: any = {}) {
        super();

        if (data['id'] !== undefined) this.id = data['id'];

        if (data['fileName'] !== undefined) this.fileName = data['fileName'];

        if (data['path'] !== undefined) this.path = data['path'];

        if (data['size'] !== undefined) this.size = data['size'];

        if (data['mimeType'] !== undefined) this.mimeType = data['mimeType'];

        if (data['publicKey'] !== undefined) this.publicKey = data['publicKey'];

        if (data['privateKey'] !== undefined) this.privateKey = data['privateKey'];

        if (data['signature'] !== undefined) this.signature = data['signature'];

        if (data['ipAddress'] !== undefined) this.ipAddress = data['ipAddress'];
    }
}
