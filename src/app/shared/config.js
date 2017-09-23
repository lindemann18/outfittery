import envVars from 'envVars';

export default {
  hostUrl: envVars.hostUrl,
  appName: envVars.appName,
  appUrl: envVars.appUrl,
  domainToLanguage: {
    de: 'de_DE',
    at: 'de_AT',
    ch: 'de_CH',
    lu: 'de_LU',
    nl: 'nl_NL',
    be: 'nl_BE',
    se: 'sv_SE',
    dk: 'da_DK',
    com: 'en_COM',
  },
  defaultLanguage: 'de_DE',
};
