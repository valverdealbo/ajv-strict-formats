# @valbo/ajv-strict-formats

Stricter versions of JSON Schema formats for Ajv.

![npm (scoped)](https://img.shields.io/npm/v/@valbo/ajv-strict-formats)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![Build Status](https://img.shields.io/github/workflow/status/valverdealbo/ajv-strict-formats/CI)
[![Coverage Status](https://coveralls.io/repos/github/valverdealbo/ajv-strict-formats/badge.svg?branch=main)](https://coveralls.io/github/valverdealbo/ajv-strict-formats?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/valverdealbo/ajv-strict-formats/badge.svg?targetFile=package.json)](https://snyk.io/test/github/valverdealbo/ajv-strict-formats?targetFile=package.json)

## Install

```bash
npm install @valbo/ajv-strict-formats
```

## Usage

Adds **date**, **time**, **date-time** and **uuid** formats to [Ajv](https://github.com/ajv-validator/ajv) that are stricter than the ones from the [ajv-formats](https://github.com/ajv-validator/ajv-formats) package:

```typescript
import Ajv from 'ajv';
import addFormats from '@valbo/ajv-strict-formats';

const ajv = new Ajv();
addFormats(ajv);
```

Or add only some formats:

```typescript
import Ajv from 'ajv';
import addFormats from '@valbo/ajv-strict-formats';

const ajv = new Ajv();
addFormats(ajv, ['date-time', 'uuid']);
```

### date format

Same format as the default one. Included in this package so that all the date and time formats are included.

### time format

A stricter format that only accepts **HH:mm:ss** with no fractions of seconds or timezone.

### date-time format

A stricter format that only accepts **T** as a separator and **Z** as the timezone: **2021-02-13T22:04:00Z**

Fractions of seconds are allowed: **2021-02-13T22:04:00.000Z**

### uuid format

A stricter format that only allows lowercase characters.
