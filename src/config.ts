import configExtend from 'config-extend';

const config = {
  coreApi: {
    baseUrl: 'https://api-core.padel-mate.app/v1',
  },
};

const devConfig = {
  coreApi: {
    baseUrl: 'http://localhost:4000/v1',
  },
};

if (__DEV__) {
  configExtend(config, devConfig);
}

export default config;
