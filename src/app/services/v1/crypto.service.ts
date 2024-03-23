import {
    createSign,
    createVerify,
    generateKeyPairSync,
    KeyPairSyncResult,
    Sign,
    Verify,
} from 'crypto';

/**
 * Service class for cryptographic operations.
 *
 * @class CryptoService
 */
export class CryptoService {
    /**
     * Generates a new RSA key pair.
     *
     * @returns The generated RSA key pair.
     */
    generateKeyPair(): KeyPairSyncResult<string, string> {
        return generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        });
    }

    /**
     * Creates a digital signature for a given UUID using a private key.
     *
     * @param {string} uuid - The UUID to be signed.
     * @param {string} privateKey - The private key used for signing.
     * @returns {string} The digital signature.
     */
    createSignature(uuid: string, privateKey: string): string {
        const sign: Sign = createSign('SHA256');
        sign.write(uuid);
        sign.end();

        return sign.sign({ key: privateKey, type: 'pkcs8', format: 'pem' }, 'base64');
    }

    /**
     * Verifies a digital signature for a given UUID and public key.
     *
     * @param {string} uuid - The UUID to be verified.
     * @param {string} signature - The digital signature to be verified.
     * @param {string} publicKey - The public key used for verification.
     * @returns {boolean} True if the signature is valid, false otherwise.
     */
    verifySignature(uuid: string, signature: string, publicKey: string): boolean {
        const verify: Verify = createVerify('SHA256');
        verify.write(uuid);
        verify.end();

        return verify.verify({ key: publicKey, type: 'spki', format: 'pem' }, signature, 'base64');
    }
}
