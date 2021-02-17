import Ajv from 'ajv';
import { date, time, datetime, uuid, formatNames, formats } from './formats';

describe('date()', () => {
  const ajv = new Ajv();
  ajv.addFormat('date', date);
  const schema = { type: 'string', format: 'date' };

  test('should return invalid format if the date does not match', () => {
    ajv.validate(schema, '200-02-29');
    expect(ajv.errors).not.toBeNull();
  });

  test('should return valid format for a leap year', () => {
    ajv.validate(schema, '2016-02-29');
    expect(ajv.errors).toBeNull();
  });

  test('should return valid format for a century leap year', () => {
    ajv.validate(schema, '2000-02-29');
    expect(ajv.errors).toBeNull();
  });
});

describe('time()', () => {
  const ajv = new Ajv();
  ajv.addFormat('time', time);
  const schema = { type: 'string', format: 'time' };

  test('should return invalid format if the time does not match', () => {
    ajv.validate(schema, '9:00:00');
    expect(ajv.errors).not.toBeNull();
  });

  test('should return invalid format when there is a timezone', () => {
    ajv.validate(schema, '09:00:00Z');
    expect(ajv.errors).not.toBeNull();
  });

  test('should return invalid format when there are seconds fraction', () => {
    ajv.validate(schema, '09:00:00.000');
    expect(ajv.errors).not.toBeNull();
  });

  test('should return valid format', () => {
    ajv.validate(schema, '09:00:00');
    expect(ajv.errors).toBeNull();
  });

  test('should return valid format for a leap second ', () => {
    ajv.validate(schema, '23:59:60');
    expect(ajv.errors).toBeNull();
  });
});

describe('datetime()', () => {
  const ajv = new Ajv();
  ajv.addFormat('date-time', datetime);
  const schema = { type: 'string', format: 'date-time' };

  test('should return invalid format if the date does not match', () => {
    ajv.validate(schema, '200-02-29T09:00:00Z');
    expect(ajv.errors).not.toBeNull();
  });

  test('should return invalid format if the time does not match', () => {
    ajv.validate(schema, '2000-02-29T9:00:00Z');
    expect(ajv.errors).not.toBeNull();
  });

  test('should return invalid format when the separator is not a "T"', () => {
    ajv.validate(schema, '2019-01-01 09:00:00Z');
    expect(ajv.errors).not.toBeNull();
  });

  test('should return invalid format when there is no timezone', () => {
    ajv.validate(schema, '2019-01-01T09:00:00');
    expect(ajv.errors).not.toBeNull();
  });

  test('should return valid format when there are no seconds fraction', () => {
    ajv.validate(schema, '2019-01-01T09:00:00Z');
    expect(ajv.errors).toBeNull();
  });

  test('should return valid format when there are seconds fraction', () => {
    ajv.validate(schema, '2019-01-01T09:00:00.000Z');
    expect(ajv.errors).toBeNull();
  });

  test('should return valid format for a leap year', () => {
    ajv.validate(schema, '2016-02-29T09:00:00Z');
    expect(ajv.errors).toBeNull();
  });

  test('should return valid format for a century leap year', () => {
    ajv.validate(schema, '2000-02-29T09:00:00Z');
    expect(ajv.errors).toBeNull();
  });

  test('should return valid format for a leap second ', () => {
    ajv.validate(schema, '2000-02-29T23:59:60Z');
    expect(ajv.errors).toBeNull();
  });
});

describe('uuid()', () => {
  const ajv = new Ajv();
  ajv.addFormat('uuid', uuid);
  const schema = { type: 'string', format: 'uuid' };

  test('should return invalid format when the value is not an uuid', () => {
    ajv.validate(schema, '87b494c9-68e3-4281-95b8-18ddde05c71b6');
    expect(ajv.errors).not.toBeNull();
  });

  test('should return invalid format when there are uppercase', () => {
    ajv.validate(schema, '87B494C9-68E3-4281-95B8-8DDDE05C71B6');
    expect(ajv.errors).not.toBeNull();
  });

  test('should return valid format when there are only lowercase', () => {
    ajv.validate(schema, '87b494c9-68e3-4281-95b8-8ddde05c71b6');
    expect(ajv.errors).toBeNull();
  });
});

describe('formats', () => {
  test('each key should the right validation function', () => {
    expect(formats.date).toBe(date);
    expect(formats.time).toBe(time);
    expect(formats['date-time']).toBe(datetime);
    expect(formats.uuid).toBe(uuid);
  });
});
