function translations($translateProvider, UtilServiceProvider) {
  const lang = UtilServiceProvider.$get().getCustomerLanguageBasedOnDomain();

  $translateProvider.useStaticFilesLoader({
    prefix: 'i18n/',
    suffix: '.json',
  });

  $translateProvider.preferredLanguage(lang);
  $translateProvider.useSanitizeValueStrategy('escape');
}

translations.$inject = ['$translateProvider', 'UtilServiceProvider'];

export default translations;
