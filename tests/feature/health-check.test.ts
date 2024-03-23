import axios, { AxiosResponse } from 'axios';

/**
 * Performs health check on the API.
 */
describe('Health Check API', (): void => {
    /**
     * Base URL of the API.
     */
    let baseURL: string;

    /**
     * Sets up the base URL before running tests.
     */
    beforeAll((): void => {
        baseURL = 'http://app:3000';
    });

    /**
     * Tests if the application status is returned successfully.
     *
     * @throws {Error} if any assertion fails or an error occurs during the HTTP request.
     */
    it('should return application status', async (): Promise<void> => {
        try {
            const response: AxiosResponse = await axios.get(`${baseURL}/api/v1/health-check`);
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(
                expect.objectContaining({
                    code: 200,
                    status: 'success',
                    message: 'Application is running!',
                })
            );
        } catch (error) {
            throw new Error(error);
        }
    });
});
