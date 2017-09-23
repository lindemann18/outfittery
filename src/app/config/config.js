import envVars from 'envVars';

export default new function config() {
  this.homePageUrl = envVars.homePageUrl;
  this.hostUrl = envVars.hostUrl;
  this.appName = envVars.appName;
  // base list of relevant domains
  this.countryTLDs = ['de', 'at', 'ch', 'lu', 'nl', 'be', 'se', 'dk', 'com'];
  this.countryUrls = (() => {
    const countryUrls = {};

    for (const countryTLD of this.countryTLDs) {
      countryUrls[countryTLD] = this.homePageUrl.replace(':domain', countryTLD);
    }

    return countryUrls;
  })();
  this.abTest = {
    name: 'No_test',
    version: 'No_test',
  };
  // translation config files associated on a same index basis to the this.countryNames array
  this.FACEBOOK_SDK_LANG =
    ['de_DE', 'de_DE', 'de_DE', 'de_DE', 'nl_NL', 'de_DE', 'sv_SE', 'da_DK', 'en_GB'];
  this.CUSTOMER_LANGUAGE =
    ['DE', 'AT', 'CH', 'LU', 'NL', 'BE', 'SE', 'DK', 'DE'];
  this.TRANSLATION_LANG =
    ['de_DE', 'de_AT', 'de_CH', 'de_LU', 'nl_NL', 'nl_BE', 'sv_SE', 'da_DK', 'en_COM'];
  this.FACEBOOK_INIT_CONFIG = {
    version: 'v2.5',
    appId: '123123123123',
    permissions: 'public_profile,email',
    xfbml: true,
    status: false,
    cookie: true,
  };
};
