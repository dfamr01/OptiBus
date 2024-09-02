import { formatTimeFromISOString, formatDateFromISOString } from "../utils";

describe('formatTimeFromISOString', () => {
  it('formats time correctly', () => {
    expect(formatTimeFromISOString('2023-05-15T14:30:00Z')).toBe('14:30');
    expect(formatTimeFromISOString('2023-05-15T09:05:00Z')).toBe('09:05');
    expect(formatTimeFromISOString('2023-05-15T00:00:00Z')).toBe('00:00');
    expect(formatTimeFromISOString('2023-05-15T23:59:00Z')).toBe('23:59');
  });

  it('handles different time zones correctly', () => {
    // Note: This test assumes the function always returns UTC time
    expect(formatTimeFromISOString('2023-05-15T14:30:00+02:00')).toBe('12:30');
    expect(formatTimeFromISOString('2023-05-15T14:30:00-05:00')).toBe('19:30');
  });
});

describe('formatDateFromISOString', () => {
  it('formats date correctly', () => {
    expect(formatDateFromISOString('2023-05-15T14:30:00Z')).toBe('Mon 15th May');
    expect(formatDateFromISOString('2023-01-01T00:00:00Z')).toBe('Sun 1st Jan');
    expect(formatDateFromISOString('2023-12-31T23:59:59Z')).toBe('Sun 31st Dec');
  });

  it('handles different days of the month correctly', () => {
    expect(formatDateFromISOString('2023-05-01T14:30:00Z')).toBe('Mon 1st May');
    expect(formatDateFromISOString('2023-05-02T14:30:00Z')).toBe('Tue 2nd May');
    expect(formatDateFromISOString('2023-05-03T14:30:00Z')).toBe('Wed 3rd May');
    expect(formatDateFromISOString('2023-05-04T14:30:00Z')).toBe('Thu 4th May');
    expect(formatDateFromISOString('2023-05-11T14:30:00Z')).toBe('Thu 11th May');
    expect(formatDateFromISOString('2023-05-21T14:30:00Z')).toBe('Sun 21st May');
    expect(formatDateFromISOString('2023-05-22T14:30:00Z')).toBe('Mon 22nd May');
  });

  it('handles different months correctly', () => {
    expect(formatDateFromISOString('2023-01-15T14:30:00Z')).toBe('Sun 15th Jan');
    expect(formatDateFromISOString('2023-02-15T14:30:00Z')).toBe('Wed 15th Feb');
    expect(formatDateFromISOString('2023-03-15T14:30:00Z')).toBe('Wed 15th Mar');
    expect(formatDateFromISOString('2023-04-15T14:30:00Z')).toBe('Sat 15th Apr');
    expect(formatDateFromISOString('2023-05-15T14:30:00Z')).toBe('Mon 15th May');
    expect(formatDateFromISOString('2023-06-15T14:30:00Z')).toBe('Thu 15th Jun');
    expect(formatDateFromISOString('2023-07-15T14:30:00Z')).toBe('Sat 15th Jul');
    expect(formatDateFromISOString('2023-08-15T14:30:00Z')).toBe('Tue 15th Aug');
    expect(formatDateFromISOString('2023-09-15T14:30:00Z')).toBe('Fri 15th Sep');
    expect(formatDateFromISOString('2023-10-15T14:30:00Z')).toBe('Sun 15th Oct');
    expect(formatDateFromISOString('2023-11-15T14:30:00Z')).toBe('Wed 15th Nov');
    expect(formatDateFromISOString('2023-12-15T14:30:00Z')).toBe('Fri 15th Dec');
  });

  it('handles leap years correctly', () => {
    expect(formatDateFromISOString('2024-02-29T14:30:00Z')).toBe('Thu 29th Feb');
    expect(formatDateFromISOString('2023-02-28T14:30:00Z')).toBe('Tue 28th Feb');
  });
});