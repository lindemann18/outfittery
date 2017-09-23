import stagingConfig from './staging';

const env = Object.assign({}, stagingConfig, {
  env: 'development',
  appName: 'ps-app-mobilelandingpage',
  hostUrl: '',
  postChUrl: '',
});

export default env;
