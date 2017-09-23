const daDK = require('i18n/da_DK.json');
const deAT = require('i18n/de_AT.json');
const deCH = require('i18n/de_CH.json');
const deDE = require('i18n/de_DE.json');
const deLU = require('i18n/de_LU.json');
const enCOM = require('i18n/en_COM.json');
const nlBE = require('i18n/nl_BE.json');
const nlNL = require('i18n/nl_NL.json');
const svSE = require('i18n/sv_SE.json');

function translations($translateProvider, UtilServiceProvider) {
  const lang = UtilServiceProvider.$get().getCustomerLanguageBasedOnDomain();

  // We do this with a fileMap so that we can make webpack aware of the import
  // of the translation files. This way, the files get hashed to avoid undesired
  // caching
  $translateProvider.useStaticFilesLoader({
    fileMap: {
      da_DK: daDK,
      de_AT: deAT,
      de_CH: deCH,
      de_DE: deDE,
      de_LU: deLU,
      en_COM: enCOM,
      nl_BE: nlBE,
      nl_NL: nlNL,
      sv_SE: svSE,
    },
    prefix: '',
    suffix: '',
  });

  $translateProvider.preferredLanguage(lang);
  $translateProvider.useSanitizeValueStrategy('escape');
}

translations.$inject = ['$translateProvider', 'UtilServiceProvider'];

export default translations;
