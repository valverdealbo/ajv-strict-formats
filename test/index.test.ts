import Ajv from 'ajv';
import { time, datetime, uuid } from '../src/formats';
import addFormats from '../src';

describe('addFormats()', () => {
  test('should add all formats', () => {
    const ajv = new Ajv();
    addFormats(ajv);
    expect(ajv.formats.time).toBeDefined();
    expect(ajv.formats['date-time']).toBeDefined();
    expect(ajv.formats.uuid).toBeDefined();
  });

  test('should add only the provided formats', () => {
    const ajv = new Ajv();
    addFormats(ajv, ['time']);
    expect(ajv.formats.time).toBeDefined();
    expect(ajv.formats['date-time']).toBeUndefined();
    expect(ajv.formats.uuid).toBeUndefined();
  });

  test('should return the right validation function', () => {
    expect(addFormats.get('time')).toBe(time);
    expect(addFormats.get('date-time')).toBe(datetime);
    expect(addFormats.get('uuid')).toBe(uuid);
  });
});
