import { ResetPasswordRequest } from '../ResetPasswordRequest.entity';
import { assertIsResetPasswordRequestRecent } from './assertIsResetPasswordRequestRecent';

describe('assertIsResetPasswordRequestRecent', () => {
    const resetPasswordRequest = new ResetPasswordRequest();
    resetPasswordRequest.id = 'resetPasswordRequestId1';
    resetPasswordRequest.createdAt = '2023-06-19T19:00:00.858Z';
    it('should not throw error if < 10 minutes ago', () => {
        const now = new Date('2023-06-19T19:06:00.858Z');

        expect(() => assertIsResetPasswordRequestRecent(resetPasswordRequest, now)).not.toThrow();
    });

    it('should return false if > 10 minutes ago', () => {
        const now = new Date('2023-06-19T19:16:00.858Z');

        expect(() => assertIsResetPasswordRequestRecent(resetPasswordRequest, now)).toThrowError(
            `resetPasswordRequest resetPasswordRequestId1 has been created more than 10 minutes ago`,
        );
    });
});
