import { QueryParams } from './query-params.type';

export const transformParams = (params?: QueryParams) => {
  return Object.entries(params || {}).reduce((acc, [key, value]) => {
    if (typeof value === 'object') {
      acc[key] = JSON.stringify(value);
    } else {
      acc[key] = value;
    }

    return acc;
  }, {} as Record<string, unknown>);
};
