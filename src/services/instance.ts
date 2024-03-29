import ky from 'ky';
import config from '@/config.ts';

const prefixUrl = config.coreApi.baseUrl;

export const instance = ky.extend({
  prefixUrl,
  headers: {
    Accept: 'application/json',
  },
});
