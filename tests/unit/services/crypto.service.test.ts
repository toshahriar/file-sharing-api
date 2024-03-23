import { CryptoService } from '../../../src/app/services/v1';

/**
 * Unit tests for the CryptoService class.
 */
describe('CryptoService', () => {
    /**
     * The instance of CryptoService used for testing.
     */
    let cryptoService: CryptoService;

    beforeEach(() => {
        cryptoService = new CryptoService();
    });

    /**
     * Should generate a valid RSA key pair.
     */
    describe('generateKeyPair', () => {
        it('should generate a valid RSA key pair', () => {
            const keyPair: any = cryptoService.generateKeyPair();
            expect(keyPair.privateKey).toBeTruthy();
            expect(keyPair.publicKey).toBeTruthy();
        });
    });

    /**
     * Should create and verify signature successfully.
     */
    describe('createSignature and verifySignature', () => {
        it('should create and verify signature successfully', () => {
            const uuid: any = 'example_uuid';
            const keyPair: any = cryptoService.generateKeyPair();
            const signature: any = cryptoService.createSignature(uuid, keyPair.privateKey);
            const isValid: any = cryptoService.verifySignature(uuid, signature, keyPair.publicKey);
            expect(isValid).toBe(true);
        });

        /**
         * Should fail verification for different UUID.
         */
        it('should fail verification for different UUID', () => {
            const uuid1: any = 'example_uuid_1';
            const uuid2: any = 'example_uuid_2';
            const keyPair: any = cryptoService.generateKeyPair();
            const signature: any = cryptoService.createSignature(uuid1, keyPair.privateKey);
            const isValid: any = cryptoService.verifySignature(uuid2, signature, keyPair.publicKey);
            expect(isValid).toBe(false);
        });

        /**
         * Should fail verification for different public key.
         */
        it('should fail verification for different public key', () => {
            const uuid: any = 'example_uuid';
            const keyPair1: any = cryptoService.generateKeyPair();
            const keyPair2: any = cryptoService.generateKeyPair(); // different key pair
            const signature: any = cryptoService.createSignature(uuid, keyPair1.privateKey);
            const isValid: any = cryptoService.verifySignature(uuid, signature, keyPair2.publicKey);
            expect(isValid).toBe(false);
        });
    });
});
