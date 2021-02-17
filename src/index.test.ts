import Ajv from 'ajv';
import { date, time, datetime, uuid } from './formats';
import addFormats from '.';

describe('addFormats()', () => {
  test('should add all formats', () => {
    const ajv = new Ajv();
    addFormats(ajv);
    expect(ajv.formats.date).toBeDefined();
    expect(ajv.formats.time).toBeDefined();
    expect(ajv.formats['date-time']).toBeDefined();
    expect(ajv.formats.uuid).toBeDefined();
  });

  test('should add only the provided formats', () => {
    const ajv = new Ajv();
    addFormats(ajv, ['date', 'time']);
    expect(ajv.formats.date).toBeDefined();
    expect(ajv.formats.time).toBeDefined();
    expect(ajv.formats['date-time']).toBeUndefined();
    expect(ajv.formats.uuid).toBeUndefined();
  });

  test('should return the right validation function', () => {
    expect(addFormats.get('date')).toBe(date);
    expect(addFormats.get('time')).toBe(time);
    expect(addFormats.get('date-time')).toBe(datetime);
    expect(addFormats.get('uuid')).toBe(uuid);
  });
});
