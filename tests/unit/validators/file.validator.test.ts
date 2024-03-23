import { FileValidator } from '../../../src/app/validators/v1';
import { AbstractValidator } from '../../../src/core/abstracts';

/**
 * Unit tests for the FileValidator class.
 */
describe('FileValidator', (): void => {
    /**
     * Instance of FileValidator class for testing.
     * @type {FileValidator}
     */
    let fileValidator: FileValidator;

    beforeEach((): void => {
        fileValidator = new FileValidator();
    });

    /**
     * Tests that FileValidator is an instance of AbstractValidator.
     */
    it('should be an instance of AbstractValidator', (): void => {
        expect(fileValidator).toBeInstanceOf(AbstractValidator);
    });

    /**
     * Tests that FileValidator has rules defined for file validation.
     */
    it('should have rules defined for file validation', (): void => {
        expect(fileValidator.rules).toBeDefined();
        expect(fileValidator.rules).toEqual({ file: 'required' });
    });
});
