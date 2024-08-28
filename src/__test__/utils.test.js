import { formatDateFromISOString, formatTimeFromISOString } from '../utils';

describe('Utility Functions', () => {
  describe('formatDateFromISOString', () => {
    it('should format date correctly', () => {
      expect(formatDateFromISOString('2024-08-28T10:00:00')).toBe('28 Aug 2024');
    });
  });

  describe('formatTimeFromISOString', () => {
    it('should format time correctly', () => {
      expect(formatTimeFromISOString('2024-08-28T10:00:00')).toBe('10:00');
    });
  });
});