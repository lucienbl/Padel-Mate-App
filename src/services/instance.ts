import ky from 'ky';
import config from '@/config.ts';
// @ts-ignore
import { KyHeadersInit } from 'ky/distribution/types/options';
import { useAppStore } from '@/stores/app.ts';

const prefixUrl = config.coreApi.baseUrl;

export const instance = () => {
  const headers: KyHeadersInit = {
    Accept: 'application/json',
  };

  if (useAppStore.getState().token) {
    headers.Authorization = `Bearer ${useAppStore.getState().token}`;
  }

  return ky.extend({
    prefixUrl,
    headers,
  });
};
