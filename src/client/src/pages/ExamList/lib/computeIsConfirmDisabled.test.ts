import { computeIsConfirmDisabled } from './computeIsConfirmDisabled';

describe('computeIsConfirmDisabled', () => {
    it('should return true if no name is provided', () => {
        const name = '';
        const duration = '60';
        const selectedClasseId = 'classeId';

        const isConfirmDisabled = computeIsConfirmDisabled({ name, duration, selectedClasseId });

        expect(isConfirmDisabled).toBe(true);
    });

    it('should return true if no duration is provided', () => {
        const name = 'exam name';
        const duration = '';
        const selectedClasseId = 'classeId';

        const isConfirmDisabled = computeIsConfirmDisabled({ name, duration, selectedClasseId });

        expect(isConfirmDisabled).toBe(true);
    });

    it('should return true if duration is 0', () => {
        const name = 'exam name';
        const duration = '00';
        const selectedClasseId = 'classeId';

        const isConfirmDisabled = computeIsConfirmDisabled({ name, duration, selectedClasseId });

        expect(isConfirmDisabled).toBe(true);
    });

    it('should return false if all the fields are filled with acceptable values', () => {
        const name = 'exam name';
        const duration = '60';
        const selectedClasseId = 'classeId';

        const isConfirmDisabled = computeIsConfirmDisabled({ name, duration, selectedClasseId });

        expect(isConfirmDisabled).toBe(false);
    });
});
