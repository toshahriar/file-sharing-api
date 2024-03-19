import { StorageEnum } from '@core/enums';
import { StorageProviderContract } from '@core/lib/storage/contracts';
import {
    AwsStorageProvider,
    GcpStorageProvider,
    LocalStorageProvider,
} from '@core/lib/storage/providers';

/**
 * Manager class for handling storage providers.
 *
 * @class StorageManager
 */
export class StorageManager {
    /**
     * Gets a storage provider based on the provided storage type.
     *
     * @param storage - The type of storage provider to get.
     * @returns A storage provider instance.
     */
    static get(storage: StorageEnum = StorageEnum.LOCAL): StorageProviderContract {
        switch (storage) {
            case StorageEnum.GCP:
                return new GcpStorageProvider();
            case StorageEnum.AWS:
                return new AwsStorageProvider();
            case StorageEnum.LOCAL:
            default:
                return new LocalStorageProvider();
        }
    }
}
