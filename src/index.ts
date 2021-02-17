import type Ajv from 'ajv';
import { Plugin, Format } from 'ajv';
import { FormatName, formats, formatNames } from './formats';

export type FormatsPluginOptions = FormatName[];

export interface FormatsPlugin extends Plugin<FormatsPluginOptions> {
  get: (format: FormatName) => Format;
}

function addFormats(ajv: Ajv, names: FormatName[]): void {
  names.forEach(name => ajv.addFormat(name, formats[name]));
}

const formatsPlugin: FormatsPlugin = (ajv: Ajv, options?: FormatsPluginOptions): Ajv => {
  if (options !== undefined) {
    addFormats(ajv, options);
    return ajv;
  }
  addFormats(ajv, formatNames);
  return ajv;
};

formatsPlugin.get = (name: FormatName) => formats[name];

export default formatsPlugin;
